"use client";
import { storyblokEditable, renderRichText } from "@storyblok/react";
import styles from "./Accordions.module.scss";

function Accordions({ blok }) {

  return (
    <div {...storyblokEditable(blok)} className={styles.accordions}>
      roto    </div>
  );
}

export default Accordions;
