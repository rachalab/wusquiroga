"use client";

import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import styles from "./SideB.module.scss";

// Define the component
function SideB({ blok }) {
  const blocks = blok.blocks || [];

  return (
    <div {...storyblokEditable(blok)} className={styles.SideB}>
      <div className={styles.sticky}>
        {blocks.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </div>
  );
}

export default SideB;
