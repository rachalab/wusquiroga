"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Sincronizar ScrollTrigger con Lenis
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Lenis espera milisegundos
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return (
    <ReactLenis root options={{ duration: 2 }}>
      {children}
    </ReactLenis>
  );
}
