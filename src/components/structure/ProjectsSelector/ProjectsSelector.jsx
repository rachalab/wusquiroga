"use client";
import Link from 'next/link';
import styles from './ProjectsSelector.module.scss';
export default function ProjectsSelector({ projects }) {

  return (
    <ul className={styles.projects}>
      {projects?.map((p) => {

        const projectName = p.data.title ? p.data.title.split(":") : [];

        return (
          <li key={p.id} className={styles.project}><Link href={p.data.url}><h3><strong>{projectName[0]}</strong> {projectName[1] ? projectName[1].trim().charAt(0).toUpperCase() + projectName[1].trim().slice(1) : ""}</h3>
            {p.data?.thumbnail ? <img src={p.data.thumbnail} /> : <span>Falta imagen</span>}
          </Link>
          </li>
        )
      })}
    </ul>
  )
};
