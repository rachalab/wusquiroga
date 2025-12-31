"use client";

import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import styles from "./SideA.module.scss";

function SideA({ blok }) {
  const blocks = blok.blocks || [];

  return (
    <div {...storyblokEditable(blok)} className={styles.SideA}>
      <div className={styles.sticky}>
        {blocks.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </div>
  );
}

export default SideA;

