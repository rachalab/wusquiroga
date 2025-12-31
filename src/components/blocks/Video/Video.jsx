"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from "./Video.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

function getEmbedUrl(url) {
  if (!url) return null;

  const youtubeRegex =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const vimeoRegex = /vimeo\.com\/(\d+)/;

  const youtubeMatch = url.match(youtubeRegex);
  const vimeoMatch = url.match(vimeoRegex);

  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  } else if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return url; // return the original if not matched
}

function Video({ blok }) {
  const {
    title = "Video",
    video_cover,
    video_mp4,
    video_webm,
    video_url,
    line1,
    line2,
    orientation,
    colorschema,
  } = blok;

  const embedUrl = getEmbedUrl(video_url);

  return (
    <div
      {...storyblokEditable(blok)}
      className={
        orientation == "horizontal"
          ? `${styles.video} ${styles.horizontal} ${colorSchemas[colorschema]}`
          : `${styles.video} ${styles.vertical} ${colorSchemas[colorschema]}`
      }
    >
      {orientation == "horizontal" && <h3>{title}</h3>}
      <div className={styles.videoWrapper}>
        <div className={styles.videoFrame}>
          {video_url ? (
            <iframe
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          ) : (
            <video
              controls
              poster={video_cover?.filename}
              style={{ width: "100%", height: "100%" }}
            >
              {video_webm?.filename && <source src={video_webm.filename} type="video/webm" />}
              {video_mp4?.filename && <source src={video_mp4.filename} type="video/mp4" />}
              Tu navegador no soporta la etiqueta de video.
            </video>
          )}
        </div>
      </div>

      <div className={styles.description}>
        {orientation != "horizontal" && <h3>{title}</h3>}
        <p>
          <strong>{line1}</strong> {line2}
        </p>
      </div>
    </div>
  );
}

export default Video;
