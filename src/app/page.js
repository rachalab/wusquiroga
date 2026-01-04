import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Page() {
  const { data } = await fetchData();

  return (
    <StoryblokStory story={data.story} />
  );
}



export async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/home`, { version: 'draft' });
}
