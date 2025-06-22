"use client";
import Link from 'next/link';
import styles from './ProjectsSelector.module.scss';
export default function ProjectsSelector({projects}){

  return(    
    <ul className={styles.projects}>
      { projects?.map((p) => (
        <li key={p.id} className={styles.project}><Link href={p.data.url}><h3><strong>{p.data?.organizations ? p.data.organizations[0].organization?.value.name : ''}</strong> {p.data.title}</h3>
        { p.data?.thumbnail ? <img src={p.data.thumbnail} /> : <span>test</span>}
        </Link>
        </li>
      ))}
    </ul>
  )};
