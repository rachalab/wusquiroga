"use client";

function Sheet({ title, cta, viewMore, item }) {
  return (
    <div className="sheet-component">
      {title && <h2>{title}</h2>}

      <div className="sheet-items">
        {item?.map((entry, index) => (
          <div key={index} className="sheet-item">
            <h3>{entry.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: entry.text }} />
          </div>
        ))}
      </div>

      {viewMore && cta && (
        <div className="sheet-cta">
          <button>{cta}</button>
        </div>
      )}
    </div>
  );
}

export default Sheet;
