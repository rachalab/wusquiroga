const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../assets');
const UPLOAD_DIR = path.join(__dirname, '../upload');
const METADATA_FILE = path.join(__dirname, '../assets-catalog/asset-metadata.json');

async function run() {
    console.log('Starting Asset Upload Preparation...');

    // 1. Create Upload Directory
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
        console.log('Created upload directory.');
    }

    // 2. Read Metadata
    if (!fs.existsSync(METADATA_FILE)) {
        console.error(`❌ Metadata file not found: ${METADATA_FILE}`);
        return;
    }
    const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
    console.log(`Loaded metadata for ${Object.keys(metadata).length} assets.`);

    let copiedCount = 0;
    let skippedCount = 0;

    for (const url in metadata) {
        const asset = metadata[url];

        // Source File
        // Based on download-assets.js, files are saved as: assetId.extension
        // However, asset.extension in metadata might be different from actual file on disk if mime-types lib gave different ext.
        // Let's assume the extension in metadata is correct as it was derived during download/metadata generation.
        const sourceFilename = `${asset.id}.${asset.extension}`;
        const sourcePath = path.join(ASSETS_DIR, sourceFilename);

        if (!fs.existsSync(sourcePath)) {
            console.warn(`⚠️ Source file not found: ${sourceFilename}`);
            skippedCount++;
            continue;
        }

        // Determine Destination Filename
        let destFilename = asset.originalFilename;
        if (!destFilename) {
            // Fallback to ID-based name if no original filename found
            destFilename = sourceFilename;
        }

        // Sanitize filename (remove dangerous chars)
        destFilename = destFilename.replace(/[<>:"/\\|?*]/g, '_');

        // Handle Collisions
        let destPath = path.join(UPLOAD_DIR, destFilename);
        let counter = 1;
        const namePart = path.parse(destFilename).name;
        const extPart = path.parse(destFilename).ext;

        while (fs.existsSync(destPath)) {
            // Check if it's the exact same content? (Optional, but good for idempotency)
            // For now, just rename to avoid overwrite
            const newName = `${namePart}_${counter}${extPart}`;
            destPath = path.join(UPLOAD_DIR, newName);
            counter++;
        }

        // Copy
        fs.copyFileSync(sourcePath, destPath);
        copiedCount++;

        if (copiedCount % 50 === 0) {
            console.log(`Copied ${copiedCount} files...`);
        }
    }

    console.log(`✅ Upload preparation complete.`);
    console.log(`Copied: ${copiedCount}`);
    console.log(`Skipped (not found): ${skippedCount}`);
    console.log(`Check ./upload folder.`);
}

run();
