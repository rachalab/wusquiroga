import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

import Breadcrumb from "@components/structure/Breadcrumb/Breadcrumb";
import styles from "./proyecto.module.scss";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const urlPath = `proyectos/${slug}`;
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
  const urlPath = `proyectos/${slug}`;
  const { data } = await fetchData(urlPath);

  const project = data.story;



  const categoryUuids = project.content.categories || [];
  const organizationUuids = project.content.organizations || [];
  const allUuids = [...categoryUuids, ...organizationUuids].filter(Boolean).join(",");


  let breadcrumbHierarchy = [];

  if (allUuids) {
    const refs = await fetchRefs(allUuids);

    const categoryCount = categoryUuids.length;

    breadcrumbHierarchy = refs.map((ref, index) => {
      let separator = "+";

      // If it's the first element of the second group (organizations)
      // and there was at least one element in the first group (categories)
      if (index === categoryCount && categoryCount > 0) {
        separator = "/";
      }

      return {
        title: ref.name,
        url: `/${ref.full_slug}`,
        separator: separator
      };
    });
  }
  return (
    <>
      <section className={styles.project}>
        <Breadcrumb hierarchy={breadcrumbHierarchy} />
        <h1>{project.name}</h1>
      </section>
      <StoryblokStory story={project} />
    </>
  );
}

export async function fetchRefs(uuids) {
  const storyblokApi = getStoryblokApi();
  const stories = await storyblokApi.get(`cdn/stories`, {
    version: 'draft',
    by_uuids_ordered: uuids
  });
  return stories.data.stories;
}


export async function fetchData(slug) {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/${slug}`, { version: 'draft' });
}
