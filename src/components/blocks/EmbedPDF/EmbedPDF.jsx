"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from "./EmbedPDF.module.scss"; // Reutilizamos los estilos existentes si son aplicables
import colorSchemas from "@styles/colorSchemas.module.scss";

function EmbedPDF({ blok }) {
  const { title, embed, url, file, cta, colorschema } = blok;

  return (
    <div {...storyblokEditable(blok)} className={`${styles.embed} ${colorSchemas[colorschema]}`}>
      {title && <h3>{title}</h3>}
      {embed ? (
        <div dangerouslySetInnerHTML={{ __html: embed }} />
      ) : url ? (
        <div className={styles.iframeWrapper}>
          <iframe
            src={url.url}
            title={title || "Embedded content"}
            allowFullScreen
          />
        </div>
      ) : null}
      {file?.filename && (
        <div className={styles.download}>
          <a href={file.filename} target="_blank" rel="noopener noreferrer">
            {cta || "Descargar Documento"}
          </a>
        </div>
      )}

      {!embed && !url && !file?.filename && <p>Embed code is not present.</p>}
    </div>
  );
}

export default EmbedPDF;
