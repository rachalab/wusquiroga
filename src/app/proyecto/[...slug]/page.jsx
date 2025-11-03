import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@components/builder/builder";
import Breadcrumb from "@components/structure/Breadcrumb/Breadcrumb";
import styles from "./proyecto.module.scss";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default async function Page({ params }) {
  const builderModelName = "project";

  const slugArray = await params; // [...slug] puede ser undefined
  const urlPath = `/proyecto/${slugArray?.slug.join("/")}`; // convierte ['abc', 'def'] → 'abc/def'

  const project = await builder
    .get(builderModelName, {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();

  // Definición de niveles del breadcrumb

  // Construcción dinámica de breadcrumb
  const categories =
    project?.data?.categories
      ?.map((cat) => ({
        title: cat?.categoryid?.value?.data?.title || "",
        url: cat?.categoryid?.value?.data?.url || "#",
      }))
      ?.filter((c) => c.title) || [];

  const organizations =
    project?.data?.organizations
      ?.map((org) => ({
        title: org?.organization?.value?.data?.title || "",
        url: org?.organization?.value?.data?.url || "#",
      }))
      ?.filter((o) => o.title) || [];

  // Combinar ambos arrays (categorías primero, luego organizaciones)
  const breadcrumbHierarchy = [...categories, ...organizations];

  return (
    <>
      <section className={styles.project}>
        <Breadcrumb hierarchy={breadcrumbHierarchy} />
        <h1>{project?.data?.title}</h1>
      </section>
      <RenderBuilderContent content={project} model={builderModelName} />
    </>
  );
}
