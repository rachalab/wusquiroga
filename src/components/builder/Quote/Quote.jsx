"use client";
import styles from './Quote.module.scss';

function Quote({ text }) {
  return (
    <blockquote className={styles.Quote}>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </blockquote>
  );
}

export default Quote;
