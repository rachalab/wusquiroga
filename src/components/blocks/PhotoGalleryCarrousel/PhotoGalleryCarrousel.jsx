"use client";
import { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Triangle from "@components/atoms/Triangle/Triangle";
import styles from "./PhotoGalleryCarrousel.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";
import { storyblokEditable } from "@storyblok/react";

function syncHeight(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (activeSlide) {
    swiper.el.style.height = `${activeSlide.scrollHeight}px`;
  }
}

function PhotoGalleryCarrousel({ blok }) {
  const handleReady = useCallback((swiper) => {
    syncHeight(swiper);
  }, []);

  return (
    <div {...storyblokEditable(blok)} className={`${styles.gallery} ${colorSchemas[blok?.colorschema]}`}>
      <h3>{blok.title}</h3>
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
        loop={true}
        navigation={{
          nextEl: `.${styles.next}`,
          prevEl: `.${styles.prev}`,
        }}
        onImagesReady={handleReady}
        onSlideChangeTransitionStart={syncHeight}
      >
        {blok.images?.map((img, index) => {
          const epigraph = img.title ? img.title.split(":") : [];

          return (
            <SwiperSlide key={index}>
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
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  );
}

export default PhotoGalleryCarrousel;

