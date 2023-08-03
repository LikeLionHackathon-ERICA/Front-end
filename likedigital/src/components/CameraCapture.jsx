import React, { useRef, useState } from "react";

export default function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  const handleStartCaptureClick = () => {
    setCapturing(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    });
  };

  const handleCaptureClick = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    videoRef.current.srcObject
      .getVideoTracks()
      .forEach((track) => track.stop());
    setCapturing(false);
  };

  return (
    <div>
      <video ref={videoRef} hidden={capturing} />
      <canvas ref={canvasRef} hidden={!capturing} />
      {capturing ? (
        <button onClick={handleCaptureClick}>Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
    </div>
  );
}
