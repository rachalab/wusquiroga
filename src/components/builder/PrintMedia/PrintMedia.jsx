"use client";

function PrintMedia({ title, pdf, embed, cta }) {
  return (
    <div className="print-media">
      {title && <h2>{title}</h2>}

      {embed && (
        <div
          className="print-media-embed"
          dangerouslySetInnerHTML={{ __html: embed }}
        />
      )}

      {pdf && (
        <div className="print-media-download">
          <a href={pdf} target="_blank" rel="noopener noreferrer">
            {cta || "Descargar"}
          </a>
        </div>
      )}
    </div>
  );
}

export default PrintMedia;
