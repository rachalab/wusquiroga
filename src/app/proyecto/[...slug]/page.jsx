import { getStoryblokApi, StoryblokComponent } from "@storyblok/react/rsc";
import Breadcrumb from "@components/structure/Breadcrumb/Breadcrumb";
import styles from "./proyecto.module.scss";

export default async function Page({ params }) {
  const { slug } = await params;
  const urlPath = `proyecto/${slug.join("/")}`;

  const storyblokApi = getStoryblokApi();
  let story;

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${urlPath}`, {
      version: "draft",
    });
    story = data.story;
  } catch (error) {
    console.error(`Error fetching story ${urlPath}:`, error);
    return <div>Story not found</div>;
  }

  const projectData = story.content;
  const breadcrumbHierarchy = [];

  return (
    <>
      <section className={styles.project}>
        <Breadcrumb hierarchy={breadcrumbHierarchy} />
        <h1>{story.name || projectData.title}</h1>
      </section>
      <StoryblokComponent blok={projectData} />
    </>
  );
}
