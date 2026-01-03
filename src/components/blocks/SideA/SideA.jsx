"use client";

import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import styles from "./SideA.module.scss";

function SideA({ blok }) {
  const blocks = blok.blocks || [];

  return (
    <div {...storyblokEditable(blok)} className={styles.sideA}>
      {blocks.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}

export default SideA;

