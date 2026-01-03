const StoryblokClient = require('storyblok-js-client').default;
const dotenv = require('dotenv');
const { COMPONENT_SCHEMAS } = require('./storyblok-config');

dotenv.config();

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

async function syncComponents() {
    console.log('Syncing components with Storyblok...');
    let existingComponents = [];
    try {
        const res = await Storyblok.get(`spaces/${storyblokSpaceId}/components`);
        existingComponents = res.data.components;
    } catch (e) {
        console.error('Error fetching components:', e);
    }

    for (const [key, compDef] of Object.entries(COMPONENT_SCHEMAS)) {
        const exists = existingComponents.find(c => c.name === compDef.name);
        if (!exists) {
            console.log(`Creating component: ${compDef.name}`);
            try {
                await Storyblok.post(`spaces/${storyblokSpaceId}/components`, { component: compDef });
            } catch (e) {
                console.error(`Failed to create component ${compDef.name}:`, e.response ? e.response.data : e);
            }
        } else {
            console.log(`Component already exists: ${compDef.name}`);
        }
    }
}

syncComponents().then(() => {
    console.log('Done!');
}).catch(err => {
    console.error('Sync failed:', err);
});
