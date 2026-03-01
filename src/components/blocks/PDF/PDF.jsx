"use client";

import { storyblokEditable } from "@storyblok/react";
import { useState, useRef, useEffect, useCallback } from "react";
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

  const sheets = parseInt(blok.sheets) === 2 ? 2 : 1;

  const [numPages, setNumPages] = useState(null);
  const [pagesToShow, setPagesToShow] = useState(0);
  const [pageWidth, setPageWidth] = useState(null);
  const containerRef = useRef(null);

  const updatePageWidth = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const currentSheets = window.innerWidth >= 768 ? sheets : 1;
      setPageWidth(Math.floor(containerWidth / currentSheets));
    }
  }, [sheets]);

  useEffect(() => {
    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    return () => window.removeEventListener('resize', updatePageWidth);
  }, [updatePageWidth]);

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
            inputRef={containerRef}
          >
            {numPages && pageWidth && (
              <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                breakpoints={sheets == 2 ? {
                  768: { slidesPerView: 2, slidesPerGroup: 2 },
                } : {}}
                navigation={{
                  nextEl: `.${styles.next}`,
                  prevEl: `.${styles.prev}`,
                }}
              >
                {Array.from(new Array(pagesToShow), (_, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.page}>
                      <Page pageNumber={index + 1} width={pageWidth} />
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
