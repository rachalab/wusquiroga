"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Triangle from "@components/atoms/Triangle/Triangle";
import styles from "./PhotoGalleryCarrousel.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

function PhotoGalleryCarrousel({ title, images, colorschema }) {
  return (
    <div className={`${styles.gallery} ${colorSchemas[colorschema]}`}>
      <h3>{title}</h3>
      <div className={styles.controls}>
        <div className={styles.prev}>
          <Triangle angle={-90} />
        </div>
        <div className={styles.next}>
          <Triangle angle={90} />
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.1}
        spaceBetween={"5%"}
        navigation={{
          nextEl: `.${styles.next}`,
          prevEl: `.${styles.prev}`,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            {img.file && (
              <img
                src={img.file}
                alt={img.alt || img.title || `image-${index}`}
                download="test.jpg"
              />
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PhotoGalleryCarrousel;
