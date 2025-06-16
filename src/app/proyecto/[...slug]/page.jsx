import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder/builder";

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
      <h1>{project?.data?.title}</h1>
      <RenderBuilderContent content={project} model={builderModelName} />
    </>
  );
}
