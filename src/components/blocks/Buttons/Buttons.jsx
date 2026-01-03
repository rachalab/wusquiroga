"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from "./Buttons.module.scss";

function Buttons({ blok }) {
  const buttons = blok.buttons;

  return (
    <div {...storyblokEditable(blok)} className={styles.buttons}>
      {buttons?.map((button, key) => (

        <a {...storyblokEditable(button)} key={key} href={button.url} className={styles.button + ' ' + styles[button.hierarchy]}>{button.title}</a>
      ))}
    </div>
  );
}

export default Buttons;
