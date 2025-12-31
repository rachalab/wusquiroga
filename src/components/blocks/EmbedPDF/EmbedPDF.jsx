"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from "./EmbedPDF.module.scss"; // Reutilizamos los estilos existentes si son aplicables
import colorSchemas from "@styles/colorSchemas.module.scss";

function EmbedPDF({ blok }) {
  const { title, embed, file, cta, colorschema } = blok;

  return (
    <div {...storyblokEditable(blok)} className={`${styles.embed} ${colorSchemas[colorschema]}`}>
      {title && <h3>{title}</h3>}
      {embed && <div dangerouslySetInnerHTML={{ __html: embed }} />}
      {file?.filename && ( // Renderiza el botón de descarga si se proporciona una URL
        <div className={styles.download}>
          <a href={file.filename} target="_blank" rel="noopener noreferrer">
            {cta || "Descargar Documento"}
          </a>
        </div>
      )}

      {!embed && !file && <p>Embed code is not present.</p>}
    </div>
  );
}

export default EmbedPDF;
