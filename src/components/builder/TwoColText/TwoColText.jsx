"use client";

import styles from './TwoColText.module.scss';

function TwoColText({ column1, column2, side }) {
  return (
    <div className={styles.TwoColText}>
      
      <div
              className={styles.column}
              dangerouslySetInnerHTML={{ __html: column1 }}
      />
       <div
              className={styles.column}
              dangerouslySetInnerHTML={{ __html: column2 }}
      />

    </div>
  );
}

export default TwoColText;
