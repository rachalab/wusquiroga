"use client";
import { storyblokEditable, renderRichText } from "@storyblok/react";
import styles from "./Accordions.module.scss";
import { useState, useRef, useEffect } from "react";
import Triangle from "@components/atoms/Triangle/Triangle";
import colorSchemas from "@styles/colorSchemas.module.scss";

function Accordions({ blok }) {
  const [openIndex, setOpenIndex] = useState(blok.firstOpen ? 0 : null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  return (
    <div {...storyblokEditable(blok)} className={`${styles.accordions} ${colorSchemas['tertiary']} `}>
      {blok?.accordion.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`${styles.accordionItem} ${isOpen ? styles.open : styles.closed} `}
          >
            <button
              className={styles.accordionTitle}
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
            >
              <h4>{item.title}</h4>
              <div className={styles.icon}>
                <Triangle angle={isOpen ? 0 : 180} />
              </div>
            </button>
            <div
              className={styles.accordionContent}
              style={{ maxHeight: isOpen ? "5000px" : "0px" }}
            >
              {item?.text && (
                <div
                  className={styles.accordionText}
                  dangerouslySetInnerHTML={{ __html: renderRichText(item?.text) }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordions;