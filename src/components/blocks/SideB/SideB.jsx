"use client";

import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import styles from "./SideB.module.scss";

// Define the component
function SideB({ blok }) {
  const blocks = blok.blocks || [];

  return (
    <div {...storyblokEditable(blok)}>
      <div className={styles.sideB}>
        <div className={styles.header}>
          <h2>Lado</h2>
          <h3>
            <strong>B</strong>
          </h3>
        </div>

        <div className={styles.content}>
          {blocks.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideB;
