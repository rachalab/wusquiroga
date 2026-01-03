"use client";
import React from "react";
import { storyblokEditable } from "@storyblok/react";
import AudioPlayer from "react-h5-audio-player";
import colorSchemas from "@styles/colorSchemas.module.scss";
import "react-h5-audio-player/lib/styles.css";
import styles from "./Audio.module.scss";

function Audio({ blok }) {
  return (
    <div {...storyblokEditable(blok)} className={`${styles.audio} ${colorSchemas[blok?.colorschema]}`}>
      <h3>{blok?.title}</h3>
      <p>
        <strong>{blok?.line1}</strong> {blok?.line2}
      </p>
      <AudioPlayer
        autoPlay={false} // Default to false instead of autoPlay boolean to avoid noise
        src={blok?.mp3?.filename}
        className={styles.player}
        layout="horizontal-reverse"
      />{" "}
    </div>
  );
}

export default Audio;
