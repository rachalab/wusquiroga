"use client";
import styles from "./FilesList.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

function FilesList({ title, line1, line2, type, links, colorschema }) {
  return (
    <div className={`${styles.files} ${colorSchemas[colorschema]}`}>
      {title && <h3>{title}</h3>}
      {(line1 || line2) && (
        <p>
          {line1 && <strong>{line1}</strong>}
          {line2 && (
            <>
              <br />
              {line2}
            </>
          )}
        </p>
      )}

      <ul className={type == "text" ? styles.typeText : styles.typeImage}>
        {links?.map((link, index) => (
          <li key={index}>
            <a
              href={link.url || link.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              {type === "image" && link.image && (
                <img src={link.image} alt={link.title} />
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

export default FilesList;
