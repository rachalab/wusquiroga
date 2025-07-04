"use client";

import Modal from "@components/structure/Modal/Modal";
import colorSchemas from "@styles/colorSchemas.module.scss";

import { useState } from "react";

import styles from "./Sheet.module.scss";

function Sheet({ title, cta, viewMore, item, colorschema }) {
  const showMore = item?.length > 4;
  const visibleItems = showMore ? item.slice(0, 4) : item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`${styles.sheet} ${colorSchemas[colorschema]}`}>
      {title && <h3 className={styles.sheetTitle}>{title}</h3>}
      <div className={styles.sheetContent}>
        <div className={styles.sheetItems}>
          {visibleItems?.length > 0 &&
            visibleItems.map((entry, index) => (
              <div key={index} className={styles.sheetItem}>
                <h5>{entry.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: entry.text }} />
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
          {item?.length > 0 &&
            item.map((entry, index) => (
              <div key={index} className={styles.sheetItem}>
                <h5>{entry.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: entry.text }} />
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}

export default Sheet;
