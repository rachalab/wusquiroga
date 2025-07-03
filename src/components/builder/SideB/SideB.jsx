"use client";

import { PropsWithChildren } from "react";
import styles from "./SideB.module.scss";

// Define the component
function SideB(PropsWithChildren) {
  return (
    <div className={styles.sideB}>
      <div className={styles.header}>
        <h2>
          Lad<span>o</span>
        </h2>
        <h3>
          <strong>B</strong>
        </h3>
      </div>
      {PropsWithChildren.children}
    </div>
  );
}

export default SideB;
