"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./PhotoGallerySlideshow.module.scss"; // Import the SCSS module
import colorSchemas from "@styles/colorSchemas.module.scss";

function PhotoGallerySlideshow({ title, images, colorschema }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const imageRef = useRef(null);
  const galleryRef = useRef(null); // Ref for the gallery container
  const [initialHeight, setInitialHeight] = useState(0); // State to store initial height

  // Effect for automatic slideshow progression (continuous play)
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, images.length]);

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
    if (images && images.length > 0 && galleryRef.current) {
      const img = new Image();
      img.src = images[0].file;
      img.onload = () => {
        // Set the height of the gallery container based on the first image's natural height
        // This assumes the image will take 100% width, so height will scale proportionally
        if (imageRef.current) {
          setInitialHeight(imageRef.current.clientHeight);
        }
      };
    }
  }, [images]);

  // Pre-load images for smoother transitions
  useEffect(() => {
    images.forEach((image) => {
      if (image.file) {
        const img = new Image();
        img.src = image.file;
      }
    });
  }, [images]);

  if (!images || images.length === 0) {
    return <p>No images to display.</p>;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      className={`${styles.gallery} ${colorSchemas[colorschema]}`}
      ref={galleryRef}
      style={{ height: initialHeight ? `${initialHeight}px` : "auto" }}
    >
      {title && <h3>{title}</h3>}

      <div className={styles.photos}>
        {/* Slideshow Image */}
        {currentImage && currentImage.file && (
          <div className={styles.imageContainer} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              ref={imageRef}
              key={currentIndex}
              src={currentImage.file}
              alt={currentImage.alt || currentImage.title || `slideshow-image-${currentIndex}`}
              className={styles.slideshowImage}
              style={{ objectFit: "cover", width: "100%", height: "100%" }} // Ensure image covers the container
            />
            {(currentImage.line1 || currentImage.line2) && (
              <div className={styles.overlay} style={{ position: 'absolute', bottom: 0, left: 0, padding: '1rem', background: 'rgba(0,0,0,0.5)', color: '#fff', width: '100%' }}>
                {currentImage.line1 && <strong>{currentImage.line1}</strong>}
                {currentImage.line2 && (
                  <>
                    <br />
                    {currentImage.line2}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoGallerySlideshow;
