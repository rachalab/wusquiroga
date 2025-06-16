import { builder } from "@builder.io/sdk";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default async function Projects({categoryId}) {

  
const projects = await  builder.getAll('project', {
    query: {
    data: {category: {id:categoryId}}
  },
    options: { noTargeting: true }
});


console.log(projects);
  return (
    <div className="accordions-block">
       <ul>
      {projects.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
    </div>
  );
}

