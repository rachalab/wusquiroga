import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@components/builder/builder";
import Projects from "@components/structure/Projects/Projects";
import Breadcrumb from "@components/structure/Breadcrumb/Breadcrumb";

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
      <Breadcrumb hierarchy={[{title:"Categorías",url:"#1"}]}></Breadcrumb>
      <h1>{category.name}</h1>
      <RenderBuilderContent content={category} model={builderModelName} />
      <Projects categoryId={category?.id} />
    </>
  );
}
