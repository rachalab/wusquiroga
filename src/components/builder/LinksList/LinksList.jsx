"use client";
import styles from "./LinksList.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

function LinksList({ title, line1, line2, type, links, colorschema }) {
  return (
    <div className={`${styles.links} ${colorSchemas[colorschema]}`}>
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

      <ul>
        {links?.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LinksList;
