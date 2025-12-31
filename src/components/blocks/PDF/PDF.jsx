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
  const { title, pdf, embed, cta, max = 0, colorschema } = blok;

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Determina el número de páginas a mostrar
  const pagesToShow = max === 0 ? numPages : Math.min(max, numPages);

  return (
    <div {...storyblokEditable(blok)} className={`${styles.PDF} ${colorSchemas[colorschema]}`}>
      {title && <h3>{title}</h3>}
      {embed && (
        <div
          className={styles.PDFEmbed}
          dangerouslySetInnerHTML={{ __html: embed }}
        />
      )}
      {pdf?.filename && (
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
            file={pdf.filename}
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
            <a href={pdf.filename} target="_blank" rel="noopener noreferrer">
              {cta || "Descargar PDF"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDF;
