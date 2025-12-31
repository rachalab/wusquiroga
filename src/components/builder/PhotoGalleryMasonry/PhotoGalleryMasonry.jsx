"use client";
import styles from "./PhotoGalleryMasonry.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

function PhotoGalleryMasonry({ title, images, colorschema }) {

  console.log(images)

  return (
    <div className={`${styles.gallery} ${colorSchemas[colorschema]}`}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <div className={styles.photos}>
        {images?.map((img, index) => (
          <div className={styles.image} key={index}>
            {img.file && (
              <img src={img.file} alt={img.title || `image-${index}`} />
            )}
            {(img.title || img.line1 || img.line2) && (
              <p>
                {img.line1 && <strong>{img.line1}</strong>}
                {img.line2 && (
                  <>
                    <br />
                    {img.line2}
                  </>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGalleryMasonry;
