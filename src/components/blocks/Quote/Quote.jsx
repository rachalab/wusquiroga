"use client";
import { storyblokEditable, renderRichText } from "@storyblok/react";
import styles from './Quote.module.scss';

function Quote({ blok }) {
  const text = renderRichText(blok.text);

  return (
    <blockquote {...storyblokEditable(blok)} className={styles.Quote}>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </blockquote>
  );
}

export default Quote;
