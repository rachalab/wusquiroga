"use client";
import { storyblokEditable, renderRichText } from "@storyblok/react";
import styles from './Quote.module.scss';

function Quote({ blok }) {
  return (
    <blockquote {...storyblokEditable(blok)} className={styles.Quote}>
      <p dangerouslySetInnerHTML={{ __html: renderRichText(blok.text) }} />
    </blockquote>
  );
}

export default Quote;
