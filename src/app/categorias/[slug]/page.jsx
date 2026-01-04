import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

import Breadcrumb from "@components/structure/Breadcrumb/Breadcrumb";
import styles from "./page.module.scss";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const urlPath = `categorias/${slug}`;
  const { data } = await fetchData(urlPath);
  const story = data.story;

  return {
    title: story.name + ' | Wustavo Quiroga',
    description: story.content.description,
    openGraph: {
      images: [story.content.preview?.filename],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const urlPath = `categorias/${slug}`;
  const { data } = await fetchData(urlPath);

  const category = data.story;



  let breadcrumbHierarchy = [{
    title: "Categorías",
    url: `/categorias`,
    separator: "/"
  }];





  return (
    <>
      <section className={styles.category}>
        <Breadcrumb hierarchy={breadcrumbHierarchy} />
        <h1>{category.name}</h1>
      </section>
      <StoryblokStory story={category} story_type={data.story.content.component} story_uuid={data.story.uuid} />
    </>
  );
}


export async function fetchData(slug) {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/${slug}`, { version: 'draft' });
}
