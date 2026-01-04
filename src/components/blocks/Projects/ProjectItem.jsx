"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectItem({ project }) {
    const containerRef = useRef(null);
    const mediaRef = useRef(null);
    const projectName = project.name ? project.name.split(":") : [];

    useEffect(() => {
        if (project.content.maskeffect && containerRef.current && mediaRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            tl.fromTo(
                mediaRef.current,
                { yPercent: -15, scale: 1.2 },
                { yPercent: 15, ease: "none" }
            );

            return () => {
                tl.kill();
                if (tl.scrollTrigger) tl.scrollTrigger.kill();
            };
        }
    }, [project.content.maskeffect]);

    return (
        <li ref={containerRef} className={styles.project}>
            <Link href={project.full_slug}>
                <h3>
                    <strong>{projectName[0]}</strong>{" "}
                    {projectName[1]
                        ? projectName[1].trim().charAt(0).toUpperCase() +
                        projectName[1].trim().slice(1)
                        : ""}
                </h3>
                <div className={styles.mediaContainer}>
                    {project.content.thumbnail ? (
                        project.content.thumbnail.filename.endsWith(".mp4") ? (
                            <video
                                ref={mediaRef}
                                src={project.content.thumbnail.filename}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                ref={mediaRef}
                                src={project.content.thumbnail.filename}
                                alt={project.name || "Project thumbnail"}
                            />
                        )
                    ) : (
                        <span>Falta imagen</span>
                    )}
                </div>
            </Link>
        </li>
    );
}
