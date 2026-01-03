"use client";
import styles from "./PhotoGalleryMasonry.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";
import { storyblokEditable } from "@storyblok/react";

function PhotoGalleryMasonry(blok) {

  console.log(blok);
  return (
    <div {...storyblokEditable(blok)} className={`${styles.gallery} ${colorSchemas[blok?.colorschema]}`}>
      {blok?.title && <h3 className={styles.title}>{blok.title}</h3>}

      <div className={styles.photos}>
        {blok?.images?.map((img, index) => (
          <div className={styles.image} key={index} {...storyblokEditable(img)}>
            {img.file && (
              <img src={img.file} alt={img.alt || img.title || `image-${index}`} />
            )}
            {(img.line1 || img.line2) && (
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
