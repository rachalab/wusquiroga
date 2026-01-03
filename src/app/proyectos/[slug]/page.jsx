import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

import Breadcrumb from "@components/structure/Breadcrumb/Breadcrumb";
import styles from "./proyecto.module.scss";

export default async function Page({ params }) {
  const { slug } = await params;
  const urlPath = `proyectos/${slug}`;
  const { data } = await fetchData(urlPath);
  const breadcrumbHierarchy = [];

  return (
    <>
      <section className={styles.project}>
        <Breadcrumb hierarchy={breadcrumbHierarchy} />
        <h1>{data.story.name}</h1>
      </section>
      <StoryblokStory story={data.story} />
    </>
  );
}



export async function fetchData(slug) {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/${slug}`, { version: 'draft' });
}
