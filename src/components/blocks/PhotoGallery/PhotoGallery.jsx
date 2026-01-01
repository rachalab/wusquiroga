"use client";
import React, { useMemo } from "react";
import { storyblokEditable } from "@storyblok/react";
import PhotoGalleryCarrousel from "@components/blocks/PhotoGalleryCarrousel/PhotoGalleryCarrousel";
import PhotoGalleryMasonry from "@components/blocks/PhotoGalleryMasonry/PhotoGalleryMasonry";
import PhotoGallerySlideshow from "@components/blocks/PhotoGallerySlideshow/PhotoGallerySlideshow";

function PhotoGallery({ blok }) {
  const { title, format, images: blokImages, colorschema } = blok;

  // Transform Storyblok images and parse titles line1:line2
  const images = useMemo(() => {
    return blokImages?.map(img => {
      const titleParts = img.title ? img.title.split(":") : [];
      return {
        file: img.filename,
        alt: img.alt,
        title: img.title,
        line1: titleParts[0]?.trim() || "",
        line2: titleParts[1]?.trim() || ""
      };
    }) || [];
  }, [blokImages]);

  const galleryProps = {
    title,
    images,
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
