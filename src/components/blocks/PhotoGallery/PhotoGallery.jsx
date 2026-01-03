import PhotoGalleryCarrousel from "@components/blocks/PhotoGalleryCarrousel/PhotoGalleryCarrousel";
import PhotoGalleryMasonry from "@components/blocks/PhotoGalleryMasonry/PhotoGalleryMasonry";
import PhotoGallerySlideshow from "@components/blocks/PhotoGallerySlideshow/PhotoGallerySlideshow";

function PhotoGallery({ blok }) {

  switch (blok.format) {
    case "carrousel":
      return <PhotoGalleryCarrousel blok={blok} />;
    case "slideshow":
      return <PhotoGallerySlideshow blok={blok} />;
    default:
      return <PhotoGalleryMasonry blok={blok} />;
  }
}

export default PhotoGallery;
