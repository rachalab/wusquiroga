"use client";

import { storyblokEditable, renderRichText } from "@storyblok/react";
import styles from './TwoColText.module.scss';

function TwoColText({ blok }) {
  const column1 = renderRichText(blok.column1);
  const column2 = renderRichText(blok.column2);
  console.log(blok);

  return (
    <div {...storyblokEditable(blok)} className={styles.TwoColText}>

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
