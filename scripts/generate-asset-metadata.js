const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../assets');
const CATALOG_DIR = path.join(__dirname, '../assets-catalog');
const MAPPING_FILE = path.join(ASSETS_DIR, 'asset-mapping.json');
const CATALOG_FILE = path.join(CATALOG_DIR, 'catalog.html');
const OUTPUT_FILE = path.join(CATALOG_DIR, 'asset-metadata.json');

async function run() {
    console.log('Starting Asset Metadata Generation...');

    // 1. Read existing mapping
    if (!fs.existsSync(MAPPING_FILE)) {
        console.error(`❌ Mapping file not found: ${MAPPING_FILE}`);
        return;
    }
    const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    console.log(`Loaded ${Object.keys(mapping).length} assets from mapping.`);

    // 2. Read Catalog HTML
    if (!fs.existsSync(CATALOG_FILE)) {
        console.error(`❌ Catalog file not found: ${CATALOG_FILE}`);
        return;
    }
    const html = fs.readFileSync(CATALOG_FILE, 'utf8');
    console.log(`Loaded catalog HTML (${html.length} bytes).`);

    // 3. Parse HTML for ID -> Filename mapping
    // Structure: <div data-asset-id="ID"> ... <div class="css-16lh439">FILENAME</div>

    // Split by data-asset-id to create chunks for each asset
    // Note: This assumes data-asset-id comes BEFORE the filename div in the HTML structure
    const chunks = html.split('data-asset-id="');

    const idToFilename = {};

    // Skip the first chunk (before the first asset)
    for (let i = 1; i < chunks.length; i++) {
        const chunk = chunks[i];

        // Extract ID (everything up to the first quote)
        const idMatch = chunk.match(/^([^"]+)"/);
        if (!idMatch) continue;

        const id = idMatch[1];

        // Find the filename div
        // Class: css-16lh439
        const filenameMatch = chunk.match(/class="css-16lh439">([^<]+)</);

        if (filenameMatch) {
            const filename = filenameMatch[1].trim();
            idToFilename[id] = filename;
        }
    }

    console.log(`Found ${Object.keys(idToFilename).length} in-page metadata entries (Method A).`);

    // Method B: Fallback - Search by Image SRC
    // Regex looks for src="[URL]" ... <div class="css-16lh439">[FILENAME]</div>
    // We'll iterate through the mapping to find missing items
    let fallbackCount = 0;

    // 4. Merge Data
    const completeMapping = {};
    let matchedCount = 0;

    for (const url in mapping) {
        const asset = mapping[url];
        let originalFilename = idToFilename[asset.id];

        // Fallback Logic
        if (!originalFilename) {
            // Try to find the URL in the HTML
            // The URL in HTML might be encoded or have query params, so we search for a unique part, e.g. the ID
            // Or better, exact match on the cleanUrl or originalUrl if possible. 
            // The user example shows: src=".../ID?width=..."

            // Let's create a regex that finds the ID in a src attribute, and captures the following filename
            // Context: <div class="css-wjg30a"><img ... src="...ID..." ... ></div> ... <div class="name ..."><div class="css-16lh439">FILENAME</div>

            // We'll search for the asset.id in the HTML to find the location
            // Regex explanation:
            // src="[^"]*ID[^"]*"   -> matches src containing the ID
            // [\s\S]*?             -> matches any char (lazy) until...
            // css-16lh439">        -> the filename container class
            // ([^<]+)              -> Capture the filename

            const regex = new RegExp(`src="[^"]*${asset.id}[^"]*"[\\s\\S]*?class="css-16lh439">([^<]+)<`, 'i');
            const match = html.match(regex);

            if (match) {
                originalFilename = match[1].trim();
                console.log(`🔹 Fallback found for ${asset.id}: ${originalFilename}`);
                fallbackCount++;
            }
        }

        completeMapping[url] = {
            ...asset,
            originalFilename: originalFilename || null
        };

        if (originalFilename) matchedCount++;
    }

    console.log(`Found ${fallbackCount} additional entries via Fallback (Method B).`);

    // 5. Save Output
    if (!fs.existsSync(CATALOG_DIR)) {
        fs.mkdirSync(CATALOG_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(completeMapping, null, 2));
    console.log(`✅ Saved complete metadata to: ${OUTPUT_FILE}`);
    console.log(`Matched ${matchedCount} / ${Object.keys(mapping).length} assets.`);
}

run();
