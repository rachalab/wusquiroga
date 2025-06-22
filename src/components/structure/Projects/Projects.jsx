import { builder } from "@builder.io/sdk";
import ProjectsSelector from "@components/structure/ProjectsSelector/ProjectsSelector";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default async function Projects({ categoryId, organizationId }) {
  let projects;

  // Obtener los proyectos según filtro
  if (categoryId) {
    projects = await builder.getAll("project", {
      query: {
        data: { category: { id: categoryId } },
      },
      options: { noTargeting: true, enrich: true },
    });
  } else if (organizationId) {
    const allProjects = await builder.getAll("project", {
      options: { noTargeting: true, enrich: true },
    });

    projects = allProjects.filter((p) =>
      p.data.organizations?.some(
        (org) => org.organization?.Default?.id === organizationId
      )
    );
  } else {
    projects = await builder.getAll("project", {
      options: { noTargeting: true,enrich:true },
    });
  }

  console.log(projects);

  return (
    <div className="accordions-block">
      <ProjectsSelector projects={projects} />
    </div>
  );
}
