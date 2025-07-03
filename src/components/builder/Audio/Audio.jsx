"use client";
import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import colorSchemas from "@styles/colorSchemas.module.scss";
import "react-h5-audio-player/lib/styles.css";
import styles from "./Audio.module.scss";

function Audio({ title, line1, line2, mp3, colorschema }) {
  return (
    <div className={`${styles.audio} ${colorSchemas[colorschema]}`}>
      <h3>{title}</h3>
      <p>
        <strong>{line1}</strong> {line2}
      </p>
      <AudioPlayer
        autoPlay
        src={mp3}
        className={styles.player}
        layout="horizontal-reverse"
      />{" "}
    </div>
  );
}

export default Audio;
