"use client";

import { useState, useRef, useEffect } from "react";
import Triangle from "@components/atoms/Triangle/Triangle";
import styles from "./Accordions.module.scss";

function Accordions({ firstOpen = true, accordion = [] }) {
  const [openIndex, setOpenIndex] = useState(firstOpen ? 0 : null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.accordions}>
      {accordion.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`${styles.accordionItem} ${isOpen ? styles.open : styles.closed}`}
          >
            <button
              className={styles.accordionTitle}
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
            >
              <h4>{item.title}</h4>
              <div className={styles.icon}>
                <Triangle angle={isOpen ? 180 : 0} />
              </div>
            </button>
            <div
              className={styles.accordionContent}
              style={{ maxHeight: isOpen ? "1000px" : "0px" }}
            >
              <div
                className={styles.accordionText}
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordions;
