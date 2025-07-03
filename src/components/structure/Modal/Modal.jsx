"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import styles from "./Modal.module.scss";

export default function Modal({ children, title, isOpen, onClose }) {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [isOpen]);

  return (
    <div
      className={
        isOpen
          ? `${styles.modalContent} ${styles.modalOpen}`
          : `${styles.modalContent}`
      }
      onClick={(e) => e.stopPropagation()}
    >
      <button className={styles.modalClose} onClick={onClose}>
        Cerrar
      </button>
      <div className={styles.modalWrapper} data-lenis-prevent>
        <h4 className={styles.modalTitle}>{title}</h4>
        {children}
      </div>
    </div>
  );
}
