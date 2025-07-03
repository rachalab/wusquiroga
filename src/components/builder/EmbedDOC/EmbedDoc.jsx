"use client";
import styles from "./EmbedDOC.module.scss"; // Reutilizamos los estilos existentes si son aplicables
import colorSchemas from "@styles/colorSchemas.module.scss";

function EmbedDOC({ title, embed, file, cta, colorschema }) {
  return (
    <div className={`${styles.embed} ${colorSchemas[colorschema]}`}>
      {title && <h3>{title}</h3>}
      {embed && <div dangerouslySetInnerHTML={{ __html: embed }} />}
      {file && ( // Renderiza el botón de descarga si se proporciona una URL
        <div className={styles.download}>
          <a href={file} target="_blank" rel="noopener noreferrer">
            {cta || "Descargar Documento"}
          </a>
        </div>
      )}

      {!embed && !downloadUrl && <p>Embed code is not present.</p>}
    </div>
  );
}

export default EmbedDOC;
