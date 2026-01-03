const StoryblokClient = require('storyblok-js-client').default;
const dotenv = require('dotenv');
dotenv.config();

const spaceId = process.env.STORYBLOK_SPACE_ID;
const oauthToken = process.env.STORYBLOK_OAUTH_TOKEN;

console.log('--- Config Check ---');
console.log('Space ID:', spaceId ? spaceId : 'MISSING');
console.log('Token:', oauthToken ? (oauthToken.substring(0, 4) + '...') : 'MISSING');

async function testConnection(region) {
    console.log(`\nTesting connection with region: ${region || 'default (EU)'}...`);
    const Storyblok = new StoryblokClient({
        oauthToken: oauthToken,
        region: region
    });

    try {
        const res = await Storyblok.get(`spaces/${spaceId}`);
        console.log('✅ Success! Found Space:', res.data.space.name);
        return true;
    } catch (e) {
        console.log('❌ Failed.');
        if (e.response) {
            console.log('Status:', e.response.status);
            console.log('Message:', e.response.data);
        } else {
            console.log('Error:', e.message);
        }
        return false;
    }
}

async function run() {
    if (!spaceId || !oauthToken) {
        console.error('Missing .env variables.');
        return;
    }

    // Test Default Region (EU)
    const euSuccess = await testConnection(undefined);

    // Test US Region
    if (!euSuccess) {
        await testConnection('us');
    }
}

run();
