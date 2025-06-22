"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Marquee.module.scss";

// Registramos el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Marquee({ text }) {
  const lenis = useLenis();
  const marqueeRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!marqueeRef.current || !textRef.current) return;

    const textEl = textRef.current;
    const textWidth = textEl.scrollWidth;
    const screenWidth = window.innerWidth;

    // Animación inicial: fade-in del texto
    // Se ejecuta al montar el componente, sin relación con el scroll
    const fadeIn = gsap.fromTo(
      textEl,
      { opacity: 0 },
      { opacity: 1, duration: .1, ease: "power2.out" }
    );

    // Animación de scroll: desplaza el texto horizontalmente
    const scrollAnim = gsap.fromTo(
      textEl,
      {
        x: screenWidth * 0.2, // Punto inicial fuera de pantalla a la derecha
      },
      {
        x: -textWidth * 0.9, // Se mueve hacia la izquierda
        ease: "none", // Sin easing para scroll fluido
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top 45%",       // Cuando el top del trigger entra al 45% de viewport
          end: "+=" + textWidth,  // La duración del scroll está en función del ancho del texto
          scrub: true,            // El movimiento sigue el scroll
          pin: true               // Fija el contenedor mientras ocurre la animación
        },
      }
    );

    // Limpieza al desmontar: evitamos fugas de memoria
    return () => {
      fadeIn.kill();
      scrollAnim.scrollTrigger?.kill();
      scrollAnim.kill();
    };
  }, []);

  return (
    <div className={styles.marquee} ref={marqueeRef}>
      <div className={styles.marqueeContainer} ref={containerRef}>
        <h2 ref={textRef}>{text}</h2>
      </div>
    </div>
  );
}
