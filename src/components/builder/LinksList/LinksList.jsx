"use client";

function LinksList({ title, line1, line2, type, links }) {
  return (
    <div className={`links-list type-${type}`}>
      {title && <h2>{title}</h2>}
      {line1 && <p>{line1}</p>}
      {line2 && <p>{line2}</p>}
    
      <ul>
        {links?.map((link, index) => (
          <li key={index}>
            {type === "image" && link.image && (
              <img src={link.image} alt={link.title} />
            )}
            <a href={link.url || link.file} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LinksList;
