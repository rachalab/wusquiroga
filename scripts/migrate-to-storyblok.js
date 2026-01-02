const StoryblokClient = require('storyblok-js-client').default;
const dotenv = require('dotenv');

const fs = require('fs');
const fetch = require('node-fetch');
const mime = require('mime-types');

const { COMPONENT_MAPPING, COMPONENT_SCHEMAS } = require('./storyblok-config');
const { htmlToStoryblokRichtext } = require('@storyblok/richtext/html-parser');

dotenv.config();

const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
const storyblokSpaceId = process.env.STORYBLOK_SPACE_ID;
const storyblokOAuthToken = process.env.STORYBLOK_OAUTH_TOKEN;

if (!storyblokOAuthToken || !storyblokSpaceId) {
    console.error('Please provide STORYBLOK_OAUTH_TOKEN and STORYBLOK_SPACE_ID in .env');
    process.exit(1);
}

const Storyblok = new StoryblokClient({
    oauthToken: storyblokOAuthToken,
    region: 'eu'
});

// Helper to sanitize field names (Storyblok keys must be lowercase and underscored)
const sanitizeKey = (key) => key.toLowerCase().replace(/[^a-z0-9]/g, '_');

// 1. Fetch content from Builder.io
async function fetchBuilderContent(modelName = 'page') {
    const url = `https://cdn.builder.io/api/v2/content/${modelName}?apiKey=${builderApiKey}&limit=100`;
    console.log(`Fetching content from Builder.io: ${url}`);
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    } catch (e) {
        console.error('Error fetching from Builder:', e);
        return [];
    }
}

// Helper to create a story in Storyblok
async function createStory(story) {
    try {
        const response = await Storyblok.post(`spaces/${storyblokSpaceId}/stories`, {
            story,
        });
        console.log(`Created story: ${response.data.story.name}`);
        return response.data.story;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log(`Story ${story.name} might already exist or invalid data.`, error.response.data);
        } else {
            console.error(`Error creating story ${story.name}:`, error);
        }
    }
}

// Helper to update asset metadata in Storyblok
async function updateAssetMetadata(assetId, meta) {
    try {
        await Storyblok.put(`spaces/${storyblokSpaceId}/assets/${assetId}`, {
            asset: meta
        });
        console.log(`Updated metadata for asset ${assetId}`);
    } catch (e) {
        console.warn(`Failed to update asset ${assetId} metadata:`, e.message);
    }
}

// Cache results to avoid repeated API calls
const assetCache = new Map();

// Load Asset Metadata
let assetMetadata = {};
try {
    const metadataPath = 'scripts/asset-metadata.json';
    if (fs.existsSync(metadataPath)) {
        assetMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        console.log(`Loaded asset metadata: ${Object.keys(assetMetadata).length} entries`);
    } else {
        console.warn('Warning: asset-metadata.json not found in scripts directory.');
    }
} catch (e) {
    console.warn('Error loading asset metadata:', e.message);
}

async function findLinkedAsset(url) {


    if (!url || typeof url !== 'string' || !url.startsWith('http')) return url;

    let targetFilename = null;
    let metadata = assetMetadata[url];

    // Try finding by clean URL if direct match fails
    if (!metadata) {
        try {
            const urlObj = new URL(url);
            urlObj.searchParams.delete('apiKey');
            const cleanUrl = urlObj.toString();
            metadata = assetMetadata[cleanUrl];
        } catch (e) { }
    }


    if (metadata) {
        if (metadata.originalFilename) {
            targetFilename = metadata.originalFilename.toLowerCase().replace(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        } else if (metadata.id && metadata.extension) {
            targetFilename = `${metadata.id}.${metadata.extension}`;
        }
    }



    // Fallback: If not in metadata, try legacy ID extraction or just return (user said "todos" are in metadata, but safe to keep fallback or warn)
    if (!targetFilename) {
        console.warn(`URL not found in metadata: ${url}. Falling back to ID extraction.`);
        try {
            const urlObj = new URL(url);
            urlObj.searchParams.delete('apiKey');
            const cleanUrl = urlObj.toString();
            const decodedUrl = decodeURIComponent(cleanUrl);
            const urlParts = decodedUrl.split('/');
            let lastPart = urlParts[urlParts.length - 1] || 'unknown';
            let assetId = lastPart.split('?')[0];
            if (assetId.includes('.')) {
                assetId = assetId.split('.')[0];
            }
            // We don't know extension here easily without metadata, so this fallback is weak.
            // But let's assume if it's not in metadata we might not find it in Storyblok by name either if names are custom.
            // We'll search by "ID" which matches "ID.ext" in 'contains' search?
            targetFilename = assetId;
        } catch (e) {
            return url;
        }
    }

    // Check Cache
    if (assetCache.has(targetFilename)) {
        return assetCache.get(targetFilename);
    }

    console.log(`Looking up asset for: ${targetFilename} (from ${url})`);

    try {



        // Search in Storyblok by filename
        const res = await Storyblok.get(`spaces/${storyblokSpaceId}/assets`, {
            search: targetFilename
        });



        const assets = res.data.assets;

        if (assets && assets.length > 0) {
            // Find specific match if possible
            const match = assets.find(a => a.filename.includes(targetFilename));

            if (match) {
                console.log(`✅ Found Linked Asset: ${match.filename} (ID: ${match.id})`);
                const assetData = {
                    id: match.id,
                    filename: match.filename,
                    fieldtype: 'asset',
                    alt: match.alt,
                    title: match.title,
                    copyright: match.copyright,
                    focus: match.focus,
                    name: match.name || '',
                    meta_data: match.meta_data,
                    source: match.source
                };
                console.log(assetData)
                assetCache.set(targetFilename, assetData);
                return assetData;
            }
        }

        console.warn(`⚠️ Asset not found in Storyblok: ${targetFilename}`);
        return url; // Keep original URL if not found

    } catch (error) {
        console.error(`❌ Failed to lookup asset ${targetFilename}:`, error.message);
        return url;
    }
}

// 2. Transform Builder Block to Storyblok Blok
async function transformBlock(block) {
    if (!block.component) return null;

    const builderName = block.component.name;

    // Remove the temporary filter to allow all components again or keep as requested
    // if (builderName != 'SideA' && builderName != 'SideB' && builderName != 'Audio') {
    //    return null;
    // }
    const storyblokName = COMPONENT_MAPPING[builderName];

    if (!storyblokName) {
        console.warn(`Unknown component: ${builderName}. Skipping or handling as raw HTML if possible.`);
        return null; // Or return a fallback HTML component
    }

    const options = block.component.options || {};
    const bloks = {};

    // Get Schema to identify assets
    const schemaDef = COMPONENT_SCHEMAS[storyblokName];

    // Generic mapping + Asset Handling
    for (const [key, value] of Object.entries(options)) {
        const sanitized = sanitizeKey(key);

        let processedValue = value;

        // Check if this field is an asset in our schema definition
        if (schemaDef && schemaDef.schema[sanitized] && schemaDef.schema[sanitized].type === 'asset') {
            if (value && typeof value === 'string') {
                processedValue = await findLinkedAsset(value);
            }
        }

        if (!bloks[sanitized]) {
            bloks[sanitized] = processedValue;
        }
    }

    // Specific manual mapping overrides if needed (e.g. for slightly different field names)
    if (builderName === 'TwoColText') {
        bloks.column1 = htmlToStoryblokRichtext(options.column1 || '');
        bloks.column2 = htmlToStoryblokRichtext(options.column2 || '');
    }
    if (builderName === 'Quote') {
        bloks.text = htmlToStoryblokRichtext(options.text || '');
    }
    if (builderName === 'Audio') {
        bloks.title = options.title;
        // Assets are handled by the generic loop above IF they match schema names (mp3, ogg)
    }



    // PhotoGallery: Transform images array to multiasset IDs and update metadata
    if (builderName === 'PhotoGallery' && options.images && Array.isArray(options.images)) {
        const imageAssets = [];
        for (const img of options.images) {
            if (img.file) {
                const linkedAsset = await findLinkedAsset(img.file);

                if (linkedAsset && linkedAsset.id) {
                    // Update Asset Title with Line1: Line2
                    const lines = [img.line1, img.line2].filter(l => l && l.trim().length > 0);
                    if (lines.length > 0) {
                        const newTitle = lines.join(': ');
                        await updateAssetMetadata(linkedAsset.id, { title: newTitle });
                    }
                    imageAssets.push(linkedAsset);
                }
            }
        }
        if (imageAssets.length > 0) {
            // Storyblok multiasset field expects an array of asset IDs (strings) or objects
            // Returning array of objects to be safe if client expects it, or just IDs.
            // Documentation says array of objects { id, ... } or just IDs.
            // Let's use objects with id
            bloks.images = imageAssets;
        }
    }

    // Buttons: Transform array of objects to button_item bloks
    if (builderName === 'Buttons' && options.buttons && Array.isArray(options.buttons)) {
        bloks.buttons = options.buttons.map(btn => ({
            component: 'button_item',
            title: btn.title,
            url: btn.url,
            hierarchy: btn.hierarchy
        }));
    }

    // Accordions: Transform array of objects to accordion_item bloks
    if (builderName === 'Accordions' && options.accordion && Array.isArray(options.accordion)) {
        bloks.accordion = options.accordion.map(item => ({
            component: 'accordion_item',
            title: item.title,
            text: htmlToStoryblokRichtext(item.text || '')
        }));
    }

    // Sheet: Transform array of objects to sheet_item bloks
    if (builderName === 'Sheet' && options.item && Array.isArray(options.item)) {
        bloks.item = options.item.map(item => ({
            component: 'sheet_item',
            title: item.title,
            text: htmlToStoryblokRichtext(item.text || '')
        }));
    }

    // LinksList: Transform array of objects to link_item bloks
    if (builderName === 'LinksList' && options.links && Array.isArray(options.links)) {
        const linkBloks = [];
        for (const link of options.links) {
            const item = {
                component: 'link_item',
                title: link.title,
                url: link.url
            };
            if (link.file) {
                item.file = await findLinkedAsset(link.file);
            }
            linkBloks.push(item);
        }
        bloks.links = linkBloks;
    }

    // FilesList: Transform array of objects to file_item bloks
    if (builderName === 'FilesList' && options.links && Array.isArray(options.links)) {
        const fileBloks = [];
        for (const link of options.links) {
            const item = {
                component: 'file_item',
                title: link.title,
                url: link.url
            };
            if (link.image) {
                item.image = await findLinkedAsset(link.image);
            }
            if (link.file) {
                item.file = await findLinkedAsset(link.file);
            }
            fileBloks.push(item);
        }
        bloks.links = fileBloks;
    }

    // PDF: Handle pdf asset
    if (builderName === 'PDF' && options.pdf) {
        bloks.pdf = await findLinkedAsset(options.pdf);
    }

    // EmbedPDF: Handle file asset
    if (builderName === 'EmbedPDF' && options.file) {
        bloks.file = await findLinkedAsset(options.file);
    }

    // Handle children (for container components like SideA, SideB)
    if (block.children && Array.isArray(block.children)) {
        const childPromises = block.children.map(transformBlock);
        const childBlocks = (await Promise.all(childPromises)).filter(Boolean);
        if (childBlocks.length > 0) {
            bloks.blocks = childBlocks;
        }
    }

    return {
        component: storyblokName,
        ...bloks,
    };
}

// 3. Transform Project
async function transformProject(builderProject) {
    const content = builderProject.data || {};
    const blocks = content.blocks || [];

    const bodyPromises = blocks.map(transformBlock);
    const body = (await Promise.all(bodyPromises)).filter(Boolean);

    // Handle thumbnail if present
    let thumbnail = null;
    if (content.thumbnail) {
        thumbnail = await findLinkedAsset(content.thumbnail);
    }
    const slug = builderProject.data.url ? builderProject.data.url.replace(/^\//, '') : builderProject.id;
    return {
        name: content.title || builderProject.name || 'Untitled',
        slug: slug,
        full_slug: 'proyectos/' + slug,
        parent_id: 129507083187208,
        content: {
            component: 'project',
            thumbnail: thumbnail,
            body: body,
        },
    };
}

// Main Migration Function
async function migrate() {
    let count = 0;
    console.log('Starting migration...');
    //return null;

    // Fetch pages from Builder
    const builderPages = await fetchBuilderContent('project');
    console.log(`Found ${builderPages.length} pages in Builder.io`);

    // Transform and Push
    for (const project of builderPages) {
        console.log(`Processing project: ${project.name}`);
        try {

            const storyblokStory = await transformProject(project);
            if (storyblokStory) {
                await createStory(storyblokStory);
                count++;
                // Removed return null to process ALL pages
            }
        } catch (e) {
            console.error(`Failed during processing project ${project.name}`, e);
        }
        //return null;
        if (count >= 2) {
            break;
        }
    }

    console.log(`Migration completed. ${count} pages migrated.`);
}

migrate();
