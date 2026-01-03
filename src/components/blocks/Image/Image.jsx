import { storyblokEditable } from "@storyblok/react";
import styles from "./Image.module.scss";

const Image = ({ blok }) => {
    if (!blok.image?.filename) return null;

    const epigraph = blok.image.title ? blok.image.title.split(":") : [];


    return (
        <div {...storyblokEditable(blok)} className={styles.Image}>
            <img
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                style={{ width: "100%", height: "auto", display: "block" }}
            />


            {epigraph.length > 1 ? (
                <p>
                    <strong>{epigraph[0]}</strong>
                    {epigraph[1] && ` ${epigraph[1]}`}
                </p>
            ) :
                (
                    <p>{blok.image.title}</p>
                )

            }
        </div>
    );
};

export default Image;
