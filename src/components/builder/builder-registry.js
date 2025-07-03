"use client";
import { builder, Builder, withChildren } from "@builder.io/react";

// Componentes existentes
import Audio from "./Audio/Audio";
import Video from "./Video/Video";
import Buttons from "./Buttons/Buttons";
import Accordions from "./Accordions/Accordions";
import SideA from "./SideA/SideA";
import SideB from "./SideB/SideB";

import TwoColText from "./TwoColText/TwoColText";
import Quote from "./Quote/Quote";
import Sheet from "./Sheet/Sheet";
import LinksList from "./LinksList/LinksList";
import FilesList from "./FilesList/FilesList";

import PhotoGallery from "./PhotoGallery/PhotoGallery";
import PDF from "./PDF/PDF";
import EmbedDOC from "./EmbedDOC/EmbedDOC";

// Inicializar Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Audio
Builder.registerComponent(Audio, {
  name: "Audio",
  inputs: [
    {
      name: "title",
      friendlyName: "Title",
      type: "string",
      defaultValue: "Audio",
    },
    { name: "line1", friendlyName: "Line 1", type: "string" },
    { name: "line2", friendlyName: "Line 2", type: "string" },
    {
      name: "mp3",
      friendlyName: "File (MP3)",
      type: "file",
      allowedFileTypes: ["mp3"],
    },
    {
      name: "ogg",
      friendlyName: "File (OGG)",
      type: "file",
      allowedFileTypes: ["ogg"],
    },{name: "colorschema",
      friendlyName: "Color Schema",
      type: "string",
      enum: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
      defaultValue: "primary"}
  ],
});

// Video
Builder.registerComponent(Video, {
  name: "Video",
  inputs: [
    {
      name: "title",
      friendlyName: "Title",
      type: "string",
      defaultValue: "Video",
    },
    {
      name: "videoCover",
      friendlyName: "Cover image",
      type: "file",
      allowedFileTypes: ["jpg", "png"],
    },
    {
      name: "videoMp4",
      friendlyName: "File (MP4)",
      type: "file",
      allowedFileTypes: ["mp4"],
    },
    {
      name: "videoWebm",
      friendlyName: "File (WEBM)",
      type: "file",
      allowedFileTypes: ["webm"],
    },
    { name: "videoUrl", friendlyName: "URL", type: "url" },
    { name: "line1", friendlyName: "Line 1", type: "string" },
    { name: "line2", friendlyName: "Line 2", type: "string" },
    {
      name: "orientation",
      friendlyName: "Orientation",
      type: "string",
      enum: ["horizontal", "vertical"],
      defaultValue: "horizontal",
    },{name: "colorschema",
      friendlyName: "Color Schema",
      type: "string",
      enum: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
      defaultValue: "primary"}
  ],
});

// Buttons
Builder.registerComponent(Buttons, {
  name: "Buttons",
  inputs: [
    {
      name: "buttons",
      friendlyName: "Button",
      type: "array",
      subFields: [
        { name: "title", friendlyName: "Call to action", type: "string" },
        { name: "url", friendlyName: "URL", type: "url" },
        {
          name: "hierarchy",
          friendlyName: "Hierarchy",
          type: "string",
          enum: ["primary", "secondary", "tertiary"],
        },
      ],
    },
  ],
});

// Accordions
Builder.registerComponent(Accordions, {
  name: "Accordions",
  inputs: [
    {
      name: "firstOpen",
      friendlyName: "First element opened",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "accordion",
      friendlyName: "Accordion",
      type: "array",
      subFields: [
        { name: "title", friendlyName: "Title", type: "string" },
        { name: "text", friendlyName: "Text", type: "richText" },
      ],
    },
  ],
});

// SideA con children
const SideAWithChildren = withChildren(SideA);
Builder.registerComponent(SideAWithChildren, {
  name: "SideA",
  inputs: [],
  canHaveChildren: true,
  defaultChildren: [
    {
      "@type": "@builder.io/sdk:Element",
      component: {
        name: "TwoColText",
        options: {
          column1: "This is Builder text",
          column2: "This is Builder text",
        },
      },
    },
  ],
});

// SideB con children
const SideBWithChildren = withChildren(SideB);
Builder.registerComponent(SideBWithChildren, {
  name: "SideB",
  inputs: [],
  canHaveChildren: true,
  defaultChildren: [
    {
      "@type": "@builder.io/sdk:Element",
      component: {
        name: "TwoColText",
        options: {
          column1: "This is Builder text",
          column2: "This is Builder text",
        },
      },
    },
  ],
});

// 2ColText
Builder.registerComponent(TwoColText, {
  name: "TwoColText",
  friendlyName: "2 columns text",
  inputs: [
    { name: "column1", friendlyName: "Column 1", type: "richText" },
    { name: "column2", friendlyName: "Column 2", type: "richText" },
  ],
});

// Quote
Builder.registerComponent(Quote, {
  name: "Quote",
  friendlyName: "Quote",
  inputs: [{ name: "text", friendlyName: "Quote", type: "richText" }],
});

// Sheet
Builder.registerComponent(Sheet, {
  name: "Sheet",
  friendlyName: "Sheet",
  inputs: [
    {
      name: "title",
      friendlyName: "Title",
      type: "string",
      defaultValue: "Equipo",
    },
    {
      name: "cta",
      friendlyName: "CTA",
      type: "string",
      defaultValue: "Ver todos",
    },
    {
      name: "viewMore",
      friendlyName: "View more",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "item",
      friendlyName: "Item",
      type: "array",
      subFields: [
        { name: "title", friendlyName: "Title", type: "string" },
        { name: "text", friendlyName: "Text", type: "richText" },
      ],
    },{name: "colorschema",
      friendlyName: "Color Schema",
      type: "string",
      enum: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
      defaultValue: "tertiary"}
  ],
});

// LinksList
Builder.registerComponent(LinksList, {
  name: "LinksList",
  friendlyName: "Links List",
  inputs: [
    {
      name: "title",
      friendlyName: "Title",
      type: "string",
      defaultValue: "Prensa",
    },
    { name: "line1", friendlyName: "Line 1", type: "string" },
    { name: "line2", friendlyName: "Line 2", type: "string" },
    {
      name: "links",
      friendlyName: "Link",
      type: "array",
      subFields: [
        { name: "title", friendlyName: "Title", type: "string" },
        { name: "url", friendlyName: "URL", type: "url" },
        { name: "file", friendlyName: "File", type: "file" },
      ],
    },{name: "colorschema",
      friendlyName: "Color Schema",
      type: "string",
      enum: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
      defaultValue: "tertiary"}
  ],
});

// LinksList
Builder.registerComponent(FilesList, {
  name: "FilesList",
  friendlyName: "Files List",
  inputs: [
    {
      name: "title",
      friendlyName: "Title",
      type: "string",
      defaultValue: "Ediciones en PDF",
    },
    { name: "line1", friendlyName: "Line 1", type: "string" },
    { name: "line2", friendlyName: "Line 2", type: "string" },
    {
      name: "type",
      friendlyName: "Type",
      type: "string",
      enum: [
        { label: "Sólo texto", value: "text" },
        { label: "Imágenes", value: "image" },
      ],
      defaultValue: "text",
    },
    {
      name: "links",
      friendlyName: "File",
      type: "array",
      subFields: [
        { name: "title", friendlyName: "Title", type: "string" },
        { name: "url", friendlyName: "URL", type: "url" },
        {
          name: "image",
          friendlyName: "Image",
          type: "file",
          allowedFileTypes: ["png", "gif", "jpg", "jpeg", "webp", "avif"],
        },
        { name: "file", friendlyName: "File", type: "file" },
      ],
    },{name: "colorschema",
      friendlyName: "Color Schema",
      type: "string",
      enum: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
      defaultValue: "tertiary"}
  ],
});

// PhotoGallery
Builder.registerComponent(PhotoGallery, {
  name: "PhotoGallery",
  friendlyName: "Photo Gallery",
  inputs: [
    {
      name: "title",
      friendlyName: "Title",
      type: "string",
      defaultValue: "Galería",
    },
    {
      name: "format",
      friendlyName: "Format",
      type: "string",
      enum: [
        { label: "Carrousel", value: "carrousel" },
        { label: "Masonry", value: "masonry" },
        { label: "Slideshow", value: "slideshow" },
      ],
      defaultValue: "carrousel",
    },
    {
      name: "images",
      friendlyName: "Images",
      type: "array",
      subFields: [
        { name: "line1", friendlyName: "Line 1", type: "string" },
        { name: "line2", friendlyName: "Line 2", type: "string" },
        {
          name: "file",
          friendlyName: "Image",
          type: "file",
          allowedFileTypes: ["png", "jpg", "jpeg", "webp", "avif"],
        },
      ],
    },{name: "colorschema",
      friendlyName: "Color Schema",
      type: "string",
      enum: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
      defaultValue: "tertiary"}
  ],
});

// PrintMedia
Builder.registerComponent(PDF, {
  name: "PDF",
  friendlyName: "PDF",
  inputs: [
    {
      name: "title",
      friendlyName: "Título",
      type: "string",
      defaultValue: "PDF",
    },
    {
      name: "pdf",
      friendlyName: "File",
      type: "file",
      allowedFileTypes: ["pdf", "ppt", "pptx", "zip"],
    },
    {
      name: "cta",
      friendlyName: "CTA",
      type: "string",
      defaultValue: "Descargar completo",
    },
    { name: "max", friendlyName: "Pages to show", type: "number" , defaultValue: 3},
    {name: "colorschema",
      friendlyName: "Color Schema",
      type: "string",
      enum: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
      defaultValue: "tertiary"}

  ],
});

// PrintMedia
Builder.registerComponent(EmbedDOC, {
  name: "EmbedDOC",
  friendlyName: "PDF (Issuu or 3rd)",
  inputs: [
    {
      name: "title",
      friendlyName: "Título",
      type: "string",
      defaultValue: "Print",
    },
    {
      name: "file",
      friendlyName: "File",
      type: "file",
      allowedFileTypes: ["pdf", "ppt", "pptx", "zip"],
    },
    {
      name: "embed",
      friendlyName: "Embed code",
      type: "longText",
    },
    {
      name: "cta",
      friendlyName: "CTA",
      type: "string",
      defaultValue: "Descargar completo",
    },{name: "colorschema",
      friendlyName: "Color Schema",
      type: "string",
      enum: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
      defaultValue: "tertiary"}

  ],
});
