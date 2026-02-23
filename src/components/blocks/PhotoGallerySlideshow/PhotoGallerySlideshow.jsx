"use client";
import React, { useState, useEffect, useRef } from "react";
import { storyblokEditable } from "@storyblok/react";
import { gsap } from "gsap";
import styles from "./PhotoGallerySlideshow.module.scss"; // Import the SCSS module
import colorSchemas from "@styles/colorSchemas.module.scss";

function PhotoGallerySlideshow({ blok }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const imageRef = useRef(null);
  const galleryRef = useRef(null); // Ref for the gallery container
  const [initialHeight, setInitialHeight] = useState(0); // State to store initial height

  // Effect for automatic slideshow progression (continuous play)
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === blok.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, blok.images.length]);

  // GSAP animation for fade effect
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  // Set initial height based on the first image
  useEffect(() => {
    if (blok.images && blok.images.length > 0 && galleryRef.current) {
      const img = new Image();
      img.src = blok.images[0].filename;
      img.onload = () => {
        // Set the height of the gallery container based on the first image's natural height
        // This assumes the image will take 100% width, so height will scale proportionally
        if (imageRef.current) {
          setInitialHeight(imageRef.current.clientHeight);
        }
      };
    }
  }, [blok.images]);

  // Pre-load images for smoother transitions
  useEffect(() => {
    blok.images.forEach((image) => {
      if (image.filename) {
        const img = new Image();
        img.src = image.filename;
      }
    });
  }, [blok.images]);

  if (!blok.images || blok.images.length === 0) {
    return <p>No images to display.</p>;
  }

  const currentImage = blok.images[currentIndex];

  return (
    <div
      {...storyblokEditable(blok)}
      className={`${styles.gallery} ${colorSchemas[blok.colorschema]}`}
      ref={galleryRef}
    >
      {blok.title && <h3>{blok.title}</h3>}

      <div className={styles.photos} style={{ height: initialHeight ? `${initialHeight}px` : "auto" }}>
        {/* Slideshow Image */}
        {currentImage && currentImage.filename && (
          <div className={styles.imageContainer} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              ref={imageRef}
              key={currentIndex}
              src={currentImage.filename}
              alt={currentImage.alt || currentImage.title || `slideshow-image-${currentIndex}`}
              className={styles.slideshowImage}
              style={{ objectFit: "cover", width: "100%", height: "100%" }} // Ensure image covers the container
            />

          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoGallerySlideshow;
