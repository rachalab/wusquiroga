"use client";
import React, { useState, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react";
import PhotoGalleryCarrousel from "@components/blocks/PhotoGalleryCarrousel/PhotoGalleryCarrousel";
import PhotoGalleryMasonry from "@components/blocks/PhotoGalleryMasonry/PhotoGalleryMasonry";
import PhotoGallerySlideshow from "@components/blocks/PhotoGallerySlideshow/PhotoGallerySlideshow";

function toPlainArray(arr) {
  try {
    return Array.isArray(arr) ? JSON.parse(JSON.stringify(arr)) : [];
  } catch {
    return [];
  }
}

function PhotoGallery({ blok }) {
  const { title, format, images: blokImages, colorschema } = blok;

  // Transform Storyblok images to format expected by sub-components
  // Storyblok multiasset returns an array of objects with property `filename`
  // We map it to { file: filename } which seems to be what subcomponents expect
  const initialImages = blokImages?.map(img => ({
    file: img.filename,
    title: img.title, // Preserving title if available
    alt: img.alt
  })) || [];

  const [localImages, setLocalImages] = useState([]);

  useEffect(() => {
    setLocalImages(toPlainArray(initialImages));
  }, [blokImages]);

  const galleryProps = {
    title,
    images: localImages,
    colorschema,
  };

  const renderGallery = () => {
    switch (format) {
      case "carrousel":
        return <PhotoGalleryCarrousel {...galleryProps} />;
      case "slideshow":
        return <PhotoGallerySlideshow {...galleryProps} />;
      default:
        return <PhotoGalleryMasonry {...galleryProps} />;
    }
  };

  return (
    <section {...storyblokEditable(blok)}>
      {renderGallery()}
    </section>
  );
}

export default PhotoGallery;
