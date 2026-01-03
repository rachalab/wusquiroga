"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from './Quote.module.scss';

function Quote({ blok }) {

  const text = blok?.text?.replace('\n', '<br />');

  return (
    <blockquote {...storyblokEditable(blok)} className={styles.Quote}>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </blockquote>
  );
}

export default Quote;
