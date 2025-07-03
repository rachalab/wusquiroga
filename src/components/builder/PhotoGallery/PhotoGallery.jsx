import PhotoGalleryCarrousel from "@components/builder/PhotoGalleryCarrousel/PhotoGalleryCarrousel";
import PhotoGalleryMasonry from "@components/builder/PhotoGalleryMasonry/PhotoGalleryMasonry";
import PhotoGallerySlideshow from "@components/builder/PhotoGallerySlideshow/PhotoGallerySlideshow"; // Import the new Slideshow component

function PhotoGallery({ title, format, images, colorschema }) {
  return (
    <>
      {format === "carrousel" ? (
        <PhotoGalleryCarrousel
          title={title}
          images={images}
          colorschema={colorschema}
        />
      ) : format === "slideshow" ? ( // New condition for slideshow
        <PhotoGallerySlideshow
          title={title}
          images={images}
          colorschema={colorschema}
        />
      ) : (
        // Default to Masonry if format is not "carrousel" or "slideshow"
        <PhotoGalleryMasonry
          title={title}
          images={images}
          colorschema={colorschema}
        />
      )}
    </>
  );
}

export default PhotoGallery;
