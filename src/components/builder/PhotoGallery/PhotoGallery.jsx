import React, { useCallback, useState, useEffect } from "react";
import { builder } from "@builder.io/react";
import PhotoGalleryCarrousel from "@components/builder/PhotoGalleryCarrousel/PhotoGalleryCarrousel";
import PhotoGalleryMasonry from "@components/builder/PhotoGalleryMasonry/PhotoGalleryMasonry";
import PhotoGallerySlideshow from "@components/builder/PhotoGallerySlideshow/PhotoGallerySlideshow";

function toPlainArray(arr) {
  try {
    return Array.isArray(arr) ? JSON.parse(JSON.stringify(arr)) : [];
  } catch {
    return [];
  }
}

function PhotoGallery({
  title,
  format,
  images = [],
  colorschema,
  builderBlock,
}) {
  const isEditing = builder.isEditing || builder.editingModel;
  const [localImages, setLocalImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLocalImages(toPlainArray(images));
  }, [images]);

  // === Subida binaria directa a Builder.io ===
  async function uploadBinaryFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const uploadUrl = `https://builder.io/api/v1/upload?name=${encodeURIComponent(
      file.name
    )}&altText=${encodeURIComponent(file.name)}`;

    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer bpk-94212830a9bb4345afbe82f0cd9a9f9f`,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: arrayBuffer,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return { file: data.url };
  }

  // === Leer entry desde Content API y luego hacer PATCH ===
  async function updateBuilderEntry(entryId, newImages) {
    const token = `bpk-94212830a9bb4345afbe82f0cd9a9f9f`;

    // 1️⃣ Leer entry completo usando Content API
    const entry = await builder.get("project", { query: { id: entryId } });
    if (!entry || !entry.data) {
      throw new Error("No se pudo leer el entry del modelo 'project'");
    }

    // 2️⃣ Modificar localmente el bloque correspondiente
    const updatedEntry = { ...entry };

    const traverse = (blocks) => {
      for (const block of blocks) {
        if (block.id === builderBlock?.id) {
          block.component.options.images = newImages;
          return true;
        }
        if (block.children && traverse(block.children)) return true;
      }
      return false;
    };

    const found = traverse(updatedEntry.data?.blocks || []);
    if (!found) {
      updatedEntry.data.images = newImages;
    }

    // 3️⃣ Enviar PATCH a la Write API
    const apiUrl = `https://builder.io/api/v1/write/project/${entryId}`;
    const patchRes = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEntry),
    });

    if (!patchRes.ok) {
      const errText = await patchRes.text();
      throw new Error(`Error PATCH ${patchRes.status}: ${errText}`);
    }

    const result = await patchRes.json();
    return result;
  }

  // === Drag & Drop handler ===
  const handleDrop = useCallback(
    async (event) => {
      event.preventDefault();
      event.stopPropagation();
      setError(null);

      const files = Array.from(event.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (!files.length) return;

      setIsUploading(true);

      try {
        const uploaded = await Promise.all(files.map(uploadBinaryFile));
        const currentImages = toPlainArray(images);
        const newImages = [
          ...currentImages,
          ...uploaded.map((img) => ({ file: img.file })),
        ];

        const entryId = builder.overrides.project;

        if (isEditing && entryId) {
          await updateBuilderEntry(entryId, newImages);
        } else {
          console.warn("⚠️ No se encontró entryId o no está en modo edición");
        }

        setLocalImages(newImages);

        setTimeout(() => {
          if (builder.editingModel?.triggerUpdate) {
            builder.editingModel.triggerUpdate();
          }
        }, 200);
      } catch (err) {
        console.error("Error subiendo imágenes:", err);
        setError(err.message);
      } finally {
        setIsUploading(false);
      }
    },
    [builderBlock, images]
  );

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const galleryProps = {
    title,
    images: Array.isArray(localImages)
      ? localImages.filter((i) => i && i.file)
      : [],
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
    <section
      onDrop={isEditing ? handleDrop : undefined}
      onDragOver={isEditing ? handleDragOver : undefined}
      style={
        isEditing
          ? {
            border: "2px dashed #999",
            padding: "0 0 16px 0",
            borderRadius: "8px",
            textAlign: "center",
            minHeight: "100px",
          }
          : {}
      }
    >
      {renderGallery()}
      {isEditing && (
        <div style={{ fontSize: "18px", color: "#000" }}>
          {isUploading
            ? "⏳ Subiendo imágenes..."
            : "📁 Arrastrá y soltá imágenes aquí para agregarlas a la galería"}
          {error && (
            <div style={{ color: "red", marginTop: "8px" }}>Error: {error}</div>
          )}
          <div style={{ fontSize: "16px", marginTop: "4px" }}>
            Imágenes actuales: {localImages.length}
          </div>
        </div>
      )}
    </section>
  );
}

export default PhotoGallery;
