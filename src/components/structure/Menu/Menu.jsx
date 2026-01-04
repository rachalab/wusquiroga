
import Navigation from "@components/structure/Navigation/Navigation";



export default async function Menu() {
    const storyId = "130307618714919";
    const menuStory = await fetchStory(storyId);

    if (!menuStory) return null;

    const content = menuStory.content;

    // Fetch linked stories for the menu links
    let formattedLinks = [];
    if (content.links && content.links.length > 0) {
        // content.links is likely an array of UUIDs (multi-option field)
        const linkedStories = await fetchLinkedStories(content.links.join(","));

        // Map the fetched stories to the expected structure
        // We preserve the order returned by Storyblok if using by_uuids_ordered
        formattedLinks = linkedStories.map(story => ({
            link: {
                value: {
                    data: {
                        url: `/${story.full_slug}`,
                        title: story.name
                    }
                }
            }
        }));
    }

    const menuData = {
        data: {
            bio: content.bio,
            photo: content.photo?.filename || "",
            links: formattedLinks,
            buttons: content.buttons || []
        }
    };

    return menuData?.data && (
        <Navigation menuData={menuData.data} />
    )
}

import { getStoryblokApi } from '@/lib/storyblok';

async function fetchStory(id) {
    const storyblokApi = getStoryblokApi();
    try {
        const { data } = await storyblokApi.get(`cdn/stories/${id}`, { version: 'draft' });
        return data.story;
    } catch (error) {
        console.error("Error fetching menu story:", error);
        return null;
    }
}

async function fetchLinkedStories(uuids) {
    const storyblokApi = getStoryblokApi();
    try {
        const { data } = await storyblokApi.get(`cdn/stories`, {
            version: 'draft',
            by_uuids_ordered: uuids
        });
        return data.stories;
    } catch (error) {
        console.error("Error fetching linked stories:", error);
        return [];
    }
}