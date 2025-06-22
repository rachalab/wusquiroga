import Marquee from "@components/builder/Marquee/Marquee";
import styles from "./page.module.css";
import Projects from "@components/structure/Projects/Projects";


export default function Home() {
  return (
    <div className={styles.page}>
       <Marquee text="« No recuerdo nada por separado »" />     
       <Projects />
    </div>
  );
}
