"use client";
import { useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import styles from "./Video.module.scss";
import colorSchemas from "@styles/colorSchemas.module.scss";

function getVideoProvider(url) {
  if (!url) return null;

  const youtubeRegex =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const vimeoRegex = /vimeo\.com\/(\d+)/;
  const instagramReelRegex =
    /instagram\.com\/reels?\/([a-zA-Z0-9_-]+)/;

  const youtubeMatch = url.match(youtubeRegex);
  const vimeoMatch = url.match(vimeoRegex);
  const instagramReelMatch = url.match(instagramReelRegex);

  if (youtubeMatch && youtubeMatch[1]) {
    return {
      provider: "youtube",
      id: youtubeMatch[1],
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
    };
  } else if (vimeoMatch && vimeoMatch[1]) {
    return {
      provider: "vimeo",
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  } else if (instagramReelMatch && instagramReelMatch[1]) {
    return {
      provider: "instagram",
      id: instagramReelMatch[1],
      embedUrl: `https://www.instagram.com/reel/${instagramReelMatch[1]}/embed/`,
    };
  }

  return { provider: "other", id: null, embedUrl: url };
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

  const [isPlaying, setIsPlaying] = useState(false);
  const videoInfo = getVideoProvider(video_url);
  const embedUrl = videoInfo?.embedUrl || null;

  // Show preview for YouTube/Vimeo when a cover image is provided
  const canShowPreview =
    video_url &&
    video_cover?.filename &&
    videoInfo &&
    (videoInfo.provider === "youtube" || videoInfo.provider === "vimeo");

  const handlePlay = () => {
    setIsPlaying(true);
  };

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
            canShowPreview && !isPlaying ? (
              <button
                className={styles.previewContainer}
                onClick={handlePlay}
                aria-label={`Reproducir ${title}`}
              >
                <img
                  src={video_cover.filename}
                  alt={video_cover.alt || title}
                  className={styles.previewImage}
                />
                <span className={styles.playButton} aria-hidden="true" />
              </button>
            ) : (
              <iframe
                src={
                  canShowPreview
                    ? `${embedUrl}?autoplay=1`
                    : embedUrl
                }
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%" }}
              ></iframe>
            )
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
