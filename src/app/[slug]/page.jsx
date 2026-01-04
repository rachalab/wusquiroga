import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';
import styles from "./page.module.scss";

export default async function Page({ params }) {
  const { slug } = await params;
  const { data } = await fetchData(slug);

  return (
    <>
      <section className={styles.project}>
        {slug !== "home" && <h1>{data.story.name}</h1>}
      </section>
      <StoryblokStory story={data.story} />
    </>
  );
}



export async function fetchData(slug) {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/${slug}`, { version: 'draft' });
}
