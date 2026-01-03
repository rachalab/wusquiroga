"use client";
import styles from "./PhotoGalleryMasonry.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";
import { storyblokEditable } from "@storyblok/react";

function PhotoGalleryMasonry({ blok }) {
  let epigraph = "";
  return (
    <div {...storyblokEditable(blok)} className={`${styles.gallery} ${colorSchemas[blok?.colorschema]}`}>
      {blok?.title && <h3 className={styles.title}>{blok.title}</h3>}

      <div className={styles.photos}>
        {blok?.images?.map((img, index) => {

          const epigraph = img.title ? img.title.split(":") : [];

          return (
            <div className={styles.image} key={index}>
              {img.filename && (
                <img src={img.filename} alt={img.alt || img.title || `image-${index}`} />
              )}
              {epigraph.length > 1 ? (
                <p>
                  <strong>{epigraph[0]}</strong>
                  {epigraph[1] && ` ${epigraph[1]}`}
                </p>
              ) :
                (
                  <p>{img.title}</p>
                )

              }
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default PhotoGalleryMasonry;
