import { storyblokEditable } from "@storyblok/react";

const Image = ({ blok }) => {
    if (!blok.image?.filename) return null;

    return (
        <div {...storyblokEditable(blok)} style={{ width: "100%", margin: "2rem 0" }}>
            <img
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                style={{ width: "100%", height: "auto", display: "block" }}
            />
        </div>
    );
};

export default Image;
