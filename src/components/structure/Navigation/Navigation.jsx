"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Navigation.module.scss";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Navigation({ menuData }) {
  const lenis = useLenis();
  const menuWRef = useRef(null);
  const menuOverlayRef = useRef(null);

  // Estado para mostrar/ocultar el menú
  const [isOpen, setIsOpen] = useState(false);

  // Estado para mostrar/ocultar el texto completo de la bio
  const [showFullBio, setShowFullBio] = useState(false);

  // Cantidad máxima de caracteres para la versión truncada
  const MAX_LENGTH = 200;

  // Animación inicial del logo "W"
 useEffect(() => {
  const element = menuWRef.current;

  const trigger = ScrollTrigger.create({
    trigger: document.body,
    start: "top -200",
    onEnter: () => {
      gsap.to(element, { x: 0, duration: 0.5, ease: "power2.out" });
    },
    onLeaveBack: () => {
      gsap.to(element, { x: -200, duration:0.5, ease: "power2.in" });
    }
    });

  return () => {
    trigger.kill();
  };
}, []);


  // Función para abrir/cerrar el menú con animación y scroll lock
  const toggleMenu = (e) => {
    e.preventDefault();

    if (isOpen) {
      lenis.start(); // Reanuda scroll
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuOverlayRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      });
      lenis.stop(); // Detiene scroll
    }

    setIsOpen(!isOpen);
  };

  // Alterna entre bio completa y truncada
  const toggleBio = (e) => {
    e.preventDefault();
    setShowFullBio(!showFullBio);
  };

  // Lógica para truncar el texto si excede MAX_LENGTH
  const bioText = menuData.bio || "";
  const isTruncated = bioText.length > MAX_LENGTH;
  const displayedBio =
    showFullBio || !isTruncated
      ? bioText
      : bioText.slice(0, MAX_LENGTH).trimEnd() + "…";

  return (
    <>
      {/* Header fijo con nombre */}
      <header className={styles.navigationHeader}>
        <h1>
          <Link href="/">Wustavo
          <br />
          Quiroga</Link>
        </h1>
      </header>

      {/* Botón hamburguesa para abrir menú */}
      <button className={styles.navigationButton} onClick={toggleMenu}>
        <span className={styles.w} ref={menuWRef}>
          W
        </span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      {/* Overlay del menú, animado con GSAP */}
      <div
        className={
          isOpen
            ? styles.navigationOverlay
            : `${styles.navigationOverlay} ${styles.closed}`
        }
        ref={menuOverlayRef}
      >
        <nav className={styles.navigationContent}>
          {/* Nombre en overlay */}
          <h1>
            Wustavo
            <br />
            Quiroga
          </h1>

          {/* Enlaces del menú */}
          <ul className={styles.navigationSections}>
            {menuData.links.map((menuItem, key) => (
              <li key={key}>
                <a href={menuItem.link.value.data.url}>
                  {menuItem.link.value.data.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Bio truncada con botón Leer más / Leer menos */}
          <div className={styles.bio}>
            <div className={styles.navigationDescription}>
              <p>{displayedBio}</p>
              {isTruncated && (
                <a href="#" onClick={toggleBio}>
                  {showFullBio ? "Leer menos" : "Leer más"}
                </a>
              )}
            </div>
            {/* Imagen en la sección derecha del overlay */}
            <div className={styles.photo}>
              <img src={menuData.photo} />
            </div>
          </div>
          {/* Botones de llamado a la acción (CTAs) */}
          <ul className={styles.buttons}>
            {menuData.ctas.map((menuCTA, key) => (
              <li key={key}>
                <a href={menuCTA.url}>{menuCTA.cta}</a>
              </li>
            ))}
          </ul>
        </nav>

        

        {/* Botón para cerrar el menú */}
        <button className={styles.closeButton} onClick={toggleMenu}>
          CERRAR
        </button>
      </div>
    </>
  );
}
