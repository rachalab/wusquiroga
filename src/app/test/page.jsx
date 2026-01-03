import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Page({ params }) {
    const { data } = await fetchData(params.slug);

    return (
        <div className="page">
            <StoryblokStory story={data.story} />
        </div>
    );
}

export async function fetchData(slug) {
    const storyblokApi = getStoryblokApi();
    return await storyblokApi.get(`cdn/stories/${slug}`, { version: 'draft' });
}