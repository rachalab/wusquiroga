"use client";
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

function Video({
  title = "Video",
  videoCover,
  videoMp4,
  videoWebm,
  videoUrl,
  line1,
  line2,
  orientation,
  colorschema,
}) {
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div
      className={
        orientation == "horizontal"
          ? `${styles.video} ${styles.horizontal} ${colorSchemas[colorschema]}`
          : `${styles.video} ${styles.vertical} ${colorSchemas[colorschema]}`
      }
    >
      {orientation == "horizontal" && <h3>{title}</h3>}
      <div className={styles.videoWrapper}>
        <div className={styles.videoFrame}>
          {videoUrl ? (
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
              poster={videoCover}
              style={{ width: "100%", height: "100%" }}
            >
              {videoWebm && <source src={videoWebm} type="video/webm" />}
              {videoMp4 && <source src={videoMp4} type="video/mp4" />}
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
