import Link from 'next/link';
import styles from './Projects.module.scss';
import ProjectItem from './ProjectItem';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function Projects({ blok, story_uuid, story_type }) {
  let projects = [];

  if (blok.fetch === 'all' && story_uuid) {

    if (story_type == 'category') {

      projects = await fetchRelatedProjects(story_uuid, 'categories');
    } else if (story_type == 'organization') {

      projects = await fetchRelatedProjects(story_uuid, 'organizations');
    }
  } else if (blok.projects && blok.projects.length > 0) {
    projects = await fetchData(blok.projects.join(","));
  }

  return (
    <ul className={styles.projects}>
      {projects?.map((project, key) => (
        <ProjectItem key={key} project={project} />
      ))}
    </ul>
  )
};

export async function fetchData(uuids) {
  const storyblokApi = getStoryblokApi();
  const stories = await storyblokApi.get(`cdn/stories`, { version: 'draft', by_uuids_ordered: uuids });
  return stories.data.stories;
}

export async function fetchRelatedProjects(story_uuid, filteringField) {
  const storyblokApi = getStoryblokApi();
  const stories = await storyblokApi.get(`cdn/stories`, {
    [`filter_query[${filteringField}][in]`]: story_uuid
  });
  return stories.data.stories;
}