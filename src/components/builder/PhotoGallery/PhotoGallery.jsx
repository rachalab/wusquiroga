"use client";

function PhotoGallery({ title, type, images }) {
  return (
    <div className={`photo-gallery type-${type}`}>
      {title && <h2>{title}</h2>}

      <div className="gallery-grid">
        {images?.map((img, index) => (
          <div className="gallery-item" key={index}>
            {img.file && (
              <img src={img.file} alt={img.title || `image-${index}`} />
            )}
            {(img.title || img.line1 || img.line2) && (
              <div className="caption">
                {img.title && <h3>{img.title}</h3>}
                {img.line1 && <p>{img.line1}</p>}
                {img.line2 && <p>{img.line2}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
