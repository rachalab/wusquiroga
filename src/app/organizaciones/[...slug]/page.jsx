import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder/builder";
import Projects from "../../../components/structure/Projects/Projects";
import Breadcrumb from "@components/structure/Breadcrumb/Breadcrumb";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default async function Page({ params }) {
  const builderModelName = "organization";

  const slugArray = await params; // [...slug] puede ser undefined
  const urlPath = `/organizaciones/${slugArray?.slug.join("/")}`; // convierte ['abc', 'def'] → 'abc/def'

  const organization = await builder
    .get(builderModelName, {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();





  return (
    <>
      <Breadcrumb hierarchy={[{title:"Organizaciones",url:"#1"}]}></Breadcrumb>
      <h1>{organization.name}</h1>
      <RenderBuilderContent content={organization} model={builderModelName} />
      <Projects organizationId={organization?.id} />
    </>
  );
}
