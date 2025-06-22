import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@components/builder/builder";
import Breadcrumb  from "@components/structure/Breadcrumb/Breadcrumb";

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

  return (
    <>
      <Breadcrumb hierarchy={[{title:project?.data?.category?.value.data.title,url:project?.data?.category?.value.data.url},{title:project?.data?.organizations[0]?.organization?.value?.data?.title,url:project?.data?.organizations[0]?.organization?.value?.data?.url}]}></Breadcrumb>
      <h1>{project?.data?.title}</h1>
      <RenderBuilderContent content={project} model={builderModelName} />
    </>
  );
}
