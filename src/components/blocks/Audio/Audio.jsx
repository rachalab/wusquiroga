"use client";
import React from "react";
import { storyblokEditable } from "@storyblok/react";
import AudioPlayer from "react-h5-audio-player";
import colorSchemas from "@styles/colorSchemas.module.scss";
import "react-h5-audio-player/lib/styles.css";
import styles from "./Audio.module.scss";

function Audio({ blok }) {
  const { title, line1, line2, mp3, colorschema } = blok;

  return (
    <div {...storyblokEditable(blok)} className={`${styles.audio} ${colorSchemas[colorschema]}`}>
      <h3>{title}</h3>
      <p>
        <strong>{line1}</strong> {line2}
      </p>
      <AudioPlayer
        autoPlay={false} // Default to false instead of autoPlay boolean to avoid noise
        src={mp3?.filename}
        className={styles.player}
        layout="horizontal-reverse"
      />{" "}
    </div>
  );
}

export default Audio;
