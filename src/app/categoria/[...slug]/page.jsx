import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder/builder";
import Projects from "../../../components/structure/Projects/Projects";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default async function Page({ params }) {
  const builderModelName = "category";

  const slugArray = await params; // [...slug] puede ser undefined
  const urlPath = `/categoria/${slugArray?.slug.join("/")}`; // convierte ['abc', 'def'] → 'abc/def'

  const category = await builder
    .get(builderModelName, {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();





  return (
    <>
      <RenderBuilderContent content={category} model={builderModelName} />
      <Projects categoryId={category?.id} />
    </>
  );
}
