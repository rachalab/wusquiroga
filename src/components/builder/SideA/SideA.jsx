"use client";

import  { PropsWithChildren } from 'react';
import styles from './SideA.module.scss' ;


// Define the component
function SideA (PropsWithChildren)  {
  return (
    <div className={styles.sideA}>
      {PropsWithChildren.children}
    </div>
  );
}

export default SideA;


