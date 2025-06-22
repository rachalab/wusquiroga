"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Marquee.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee({ text }) {
  const lenis = useLenis();
  const marqueeRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  

  useEffect(() => {
    if (!marqueeRef.current || !textRef.current) return;

    const textWidth = textRef.current.scrollWidth;
    const screenWidth = window.innerWidth;
    console.log(textWidth);
    const tl = gsap.fromTo(textRef.current, {

        x: screenWidth*.2,
        opacity:1,
    },
        {
      x: 0-textWidth*.65,

      ease: "ease",
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: "top 35%",
        end: "+="+textWidth,
        scrub: true,
        pin: true
      }}
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);


  return (
    <div className={styles.marquee} ref={marqueeRef}>
      <div className={styles.marqueeContainer}  ref={containerRef}>
        <h2 ref={textRef}>{text}</h2>
      </div>
    </div>
  );
}
