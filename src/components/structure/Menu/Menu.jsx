"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Menu.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const menuRef = useRef(null);

  useEffect(() => {
    const tl = gsap.fromTo(
      menuRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body, // también podés usar "html" o un div wrapper si querés más precisión
          start: "top -200",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={menuRef} className={styles.menu}>
      W
    </div>
  );
}
