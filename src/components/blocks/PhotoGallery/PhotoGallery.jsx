import PhotoGalleryCarrousel from "@components/blocks/PhotoGalleryCarrousel/PhotoGalleryCarrousel";
import PhotoGalleryMasonry from "@components/blocks/PhotoGalleryMasonry/PhotoGalleryMasonry";
import PhotoGallerySlideshow from "@components/blocks/PhotoGallerySlideshow/PhotoGallerySlideshow";

function PhotoGallery({ blok }) {

  switch (blok.format) {
    case "carrousel":
      return <PhotoGalleryCarrousel block={blok} />;
    case "slideshow":
      return <PhotoGallerySlideshow block={blok} />;
    default:
      return <PhotoGalleryMasonry block={blok} />;
  }
}

export default PhotoGallery;
