"use client";

import { storyblokEditable } from "@storyblok/react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Triangle from "@components/atoms/Triangle/Triangle";
import styles from "./PDF.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

import "swiper/css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PDF({ blok }) {


  const [numPages, setNumPages] = useState(null);
  const [pagesToShow, setPagesToShow] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPagesToShow(blok.max == 0 ? numPages : Math.min(blok.max, numPages));

  }

  // Determina el número de páginas a mostrar


  return (
    <div {...storyblokEditable(blok)} className={`${styles.PDF} ${colorSchemas[blok.colorschema]}`}>
      {blok.title && <h3>{blok.title}</h3>}
      {blok.embed && (
        <div
          className={styles.PDFEmbed}
          dangerouslySetInnerHTML={{ __html: blok.embed }}
        />
      )}
      {blok.pdf?.filename && (
        <div className={styles.PDFPDF}>
          {pagesToShow > 1 && (
            <div className={styles.controls}>
              <div className={styles.prev}>
                <Triangle angle={-90} />
              </div>
              <div className={styles.next}>
                <Triangle angle={90} />
              </div>
            </div>
          )}
          <Document
            file={blok.pdf.filename}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
            className={styles.pages}
          >
            {numPages && (
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: `.${styles.next}`,
                  prevEl: `.${styles.prev}`,
                }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {Array.from(new Array(pagesToShow), (_, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.page}>
                      <Page pageNumber={index + 1} width="640" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Document>
          <div className={styles.PDFDownload}>
            <a href={blok.pdf.filename} target="_blank" rel="noopener noreferrer">
              {blok.cta || "Descargar PDF"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDF;
