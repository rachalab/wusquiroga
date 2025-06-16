"use client";
import React, { useState } from "react";
import styles from "./Audio.module.scss";

function Audio({ title,line1, line2 }) {
  return (
    <div className={styles.audio}>
      <h3>{title}</h3>
      <p><strong>{line1}</strong> {line2}</p>

    </div>
  );
}

export default Audio;
