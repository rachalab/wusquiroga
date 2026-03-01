"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from "./Connections.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

function Connections({ blok }) {
    return (
        <div {...storyblokEditable(blok)} className={`${styles.connections} ${colorSchemas['tertiary']}`}>
            {blok.title && <h3>{blok.title}</h3>}
            <ul>
                {blok?.links?.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.cached_url || link.file?.filename}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Connections;
