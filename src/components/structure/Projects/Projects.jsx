import { getStoryblokApi } from "@storyblok/react/rsc";
import ProjectsSelector from "@components/structure/ProjectsSelector/ProjectsSelector";

export default async function Projects({ categoryId, organizationId }) {
  const storyblokApi = getStoryblokApi();
  let stories = [];

  try {
    const { data } = await storyblokApi.get(`cdn/stories`, {
      version: "draft",
      starts_with: "proyecto/",
      content_type: "project",
    });
    stories = data.stories;
  } catch (error) {
    console.error("Error fetching projects from Storyblok:", error);
  }

  // Adapter to match ProjectsSelector expectations
  const projects = stories.map((s) => ({
    id: s.uuid,
    data: {
      url: `/${s.full_slug}`,
      title: s.name,
      thumbnail: s.content?.thumbnail?.filename,
      organizations: [], // Logic for organizations/categories would go here if migrated
    },
  }));

  return (
    <div className="accordions-block">
      <ProjectsSelector projects={projects} />
    </div>
  );
}
