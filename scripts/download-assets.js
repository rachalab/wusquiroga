const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const mime = require('mime-types');

dotenv.config();

const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
const ASSETS_DIR = path.join(__dirname, '../assets');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR);
}

// 1. Fetch content from Builder.io
async function fetchBuilderContent(modelName = 'project') {
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

// Global Set to track downloaded URLs to avoid duplicates
const downloadedAssets = new Set();
// Mapping to track Original URL -> New Filename 
const assetMapping = {};

async function downloadAsset(url) {
    if (!url || typeof url !== 'string' || !url.startsWith('http')) return;

    // Clean URL
    let cleanUrl;
    try {
        const urlObj = new URL(url);
        urlObj.searchParams.delete('apiKey');
        cleanUrl = urlObj.toString();
    } catch (e) {
        return;
    }

    if (downloadedAssets.has(cleanUrl)) return;
    downloadedAssets.add(cleanUrl);

    // Identify ID and Folder structure
    const decodedUrl = decodeURIComponent(cleanUrl);

    // Simplified: Save everything in the root assets directory
    const fullFolderPath = ASSETS_DIR;
    const folderPath = 'assets'; // This 'folderPath' is now just a logical name, not a sub-directory path

    const urlParts = decodedUrl.split('/');
    let lastPart = urlParts[urlParts.length - 1] || 'unknown';

    let assetId = lastPart.split('?')[0]; // Remove query params if any remain
    if (assetId.includes('.')) {
        assetId = assetId.split('.')[0];
    }

    if (assetId.length > 100) assetId = assetId.substring(0, 50);

    console.log(`Downloading: ${url} -> Folder: ${folderPath}, ID: ${assetId}`);

    try {
        const response = await fetch(cleanUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.error(`Failed to download ${cleanUrl}: Status ${response.status}`);
            return;
        }

        const buffer = await response.buffer();

        // Determine Extension
        const contentType = response.headers.get('content-type');
        let extension = mime.extension(contentType);
        if (!extension) extension = 'bin';

        if (extension === 'jpeg') extension = 'jpg';
        if (extension === 'mpga') extension = 'mp3';
        if (contentType.includes('mpeg') && extension === 'mpga') extension = 'mp3';
        if (contentType === 'video/mp4') extension = 'mp4';

        const filename = `${assetId}.${extension}`;
        const relativeFilepath = path.join(folderPath, filename);
        const absoluteFilepath = path.join(fullFolderPath, filename);

        // Store Enhanced Mapping
        const mappingEntry = {
            id: assetId,
            originalUrl: url,
            cleanUrl: cleanUrl,
            contentType: contentType,
            extension: extension
        };

        assetMapping[url] = mappingEntry;
        assetMapping[cleanUrl] = mappingEntry;

        if (fs.existsSync(absoluteFilepath)) {
            console.log(`Skipping (exists): ${filename}`);
            return;
        }

        fs.writeFileSync(absoluteFilepath, buffer);
        console.log(`Saved: ${filename}`);

    } catch (e) {
        console.error(`Failed to download ${cleanUrl}:`, e.message);
    }
}

// Recursive traversal to find assets
async function scanForAssets(obj, parent = {}) {
    if (!obj) return;

    if (typeof obj === 'string') {
        // Simple heuristic: check if it looks like a Builder asset URL
        if (obj.includes('cdn.builder.io') || obj.includes('firebasestorage')) {

            await downloadAsset(obj);
        }
        return;
    }

    if (Array.isArray(obj)) {
        for (const item of obj) {
            await scanForAssets(item, obj);
        }
        return;
    }

    if (typeof obj === 'object') {
        for (const key in obj) {
            await scanForAssets(obj[key], obj);
        }
    }
}

async function run() {
    console.log('Starting Asset Download...');
    const builderPages = await fetchBuilderContent('project');
    console.log(`Scanning ${builderPages.length} pages...`);

    for (const project of builderPages) {
        console.log(`Scanning project: ${project.name}`);
        console.log(project.data);

        // Explicitly check for thumbnail field
        if (project.data && project.data.thumbnail) {
            await downloadAsset(project.data.thumbnail);
        }

        // Scan all other data recursively
        await scanForAssets(project.data);
    }

    // Save Mapping File
    fs.writeFileSync(path.join(ASSETS_DIR, 'asset-mapping.json'), JSON.stringify(assetMapping, null, 2));
    console.log('✅ Asset download complete. Check ./assets folder.');
}

run();
