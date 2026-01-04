import Link from 'next/link';
import styles from './Projects.module.scss';
import ProjectItem from './ProjectItem';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function Projects({ blok }) {


  const projects = await fetchData(blok.projects.join(","));

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