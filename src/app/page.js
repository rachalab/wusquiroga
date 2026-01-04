import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

export async function generateMetadata() {
  const { data } = await fetchData();
  const story = data.story;

  return {
    title: 'Wustavo Quiroga | Diseño argentino',
    description: story.content.description,
    openGraph: {
      images: [story.content.preview?.filename],
    },
  };
}

export default async function Page() {
  const { data } = await fetchData();

  return (
    <StoryblokStory story={data.story} story_type={data.story.content.component} story_uuid={data.story.uuid} />
  );
}



export async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/home`, { version: 'draft' });
}
