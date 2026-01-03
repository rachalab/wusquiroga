"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from "./LinksList.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

function LinksList({ blok }) {

  return (
    <div {...storyblokEditable(blok)} className={`${styles.links} ${colorSchemas[blok.colorschema]}`}>
      {blok.title && <h3>{blok.title}</h3>}
      {(blok.line1 || blok.line2) && (
        <p>
          {blok.line1 && <strong>{blok.line1}</strong>}
          {blok.line2 && (
            <>
              <br />
              {blok.line2}
            </>
          )}
        </p>
      )}

      <ul className={blok.preview ? styles.typeImage : styles.typeText}>
        {blok?.links?.map((link, index) => (
          <li key={index}>
            <a
              href={link.url || link.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              {blok.preview && link.image && (
                <img src={link.image.filename} alt={link.image.title} />
              )}
              {link.title}
              <br />
              <span>Descargar</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LinksList;
