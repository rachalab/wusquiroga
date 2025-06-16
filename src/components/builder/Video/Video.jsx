"use client";

function Video({
  title = "Video",
  videoCover,
  videoMp4,
  videoWebm,
  videoUrl,
  line1,
  line2,
}) {
  return (
    <div className="video-block" style={{ position: "relative", textAlign: "center" }}>
      {videoCover && (
        <div
          className="video-cover"
          style={{
            backgroundImage: `url(${videoCover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            paddingTop: "56.25%", // 16:9 aspect ratio
          }}
        >
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
            {videoUrl ? (
              <iframe
                src={videoUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%" }}
              ></iframe>
            ) : (
              <video controls poster={videoCover} style={{ width: "100%", height: "100%" }}>
                {videoWebm && <source src={videoWebm} type="video/webm" />}
                {videoMp4 && <source src={videoMp4} type="video/mp4" />}
                Tu navegador no soporta la etiqueta de video.
              </video>
            )}
          </div>
        </div>
      )}

      <div className="video-description" style={{ backgroundColor: "#3A7BFF", color: "#fff", padding: "1rem" }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <p style={{ margin: 0, fontWeight: "bold" }}>{line1}</p>
        <p style={{ margin: 0 }}>{line2}</p>
      </div>
    </div>
  );
}

export default Video;
