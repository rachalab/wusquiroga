"use client";

import { storyblokEditable, renderRichText } from "@storyblok/react";
import Modal from "@components/structure/Modal/Modal";
import colorSchemas from "@styles/colorSchemas.module.scss";

import { useState } from "react";

import styles from "./Sheet.module.scss";

function Sheet({ blok }) {
  const { title, cta, viewmore: viewMore, item: items, colorschema } = blok;

  const showMore = items?.length > 4;
  const visibleItems = showMore ? items.slice(0, 4) : items;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div {...storyblokEditable(blok)} className={`${styles.sheet} ${colorSchemas[colorschema]}`}>
      {title && <h3 >{title}</h3>}
      <div className={styles.sheetContent}>
        <div className={styles.sheetItems}>
          {visibleItems?.length > 0 &&
            visibleItems.map((entry, index) => (
              <div key={index} {...storyblokEditable(entry)} className={styles.sheetItem}>
                <h5>{entry.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: renderRichText(entry.text) }} />
              </div>
            ))}
        </div>

        {viewMore && cta && (
          <div className={styles.cta}>
            <button onClick={() => setIsModalOpen(true)}>{cta}</button>
          </div>
        )}
      </div>
      <Modal
        title={title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={styles.sheetItemsModal}>
          {items?.length > 0 &&
            items.map((entry, index) => (
              <div key={index} className={styles.sheetItem}>
                <h5>{entry.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: renderRichText(entry.text) }} />
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}

export default Sheet;
