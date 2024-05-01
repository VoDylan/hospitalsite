import React, { useState, useEffect } from "react";
import Brigham from "../../videos/Brigham.mp4";
import "./ScreenSaveFade.css";

function ScreenSaver() {
  const [showVideo, setShowVideo] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timer) clearTimeout(timer);

      const timerStart = localStorage.getItem("timerStart");
      if (timerStart) {
        const elapsed = Date.now() - parseInt(timerStart, 10);
        const remaining =(30 * 60000) - elapsed; // 30 minutes in milliseconds
        if (remaining > 0) {
          setTimer(setTimeout(() => setShowVideo(false), remaining));
        } else {
          setShowVideo(true);
        }
      } else {
        setShowVideo(true);
      }
      localStorage.setItem("timerStart", Date.now().toString());
    };

    resetTimer(); // Reset timer on component mount or update

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    const handleUserActivity = () => {
      setShowVideo(false);
      localStorage.setItem("timerStart", Date.now().toString());
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Insert") {
        setShowVideo(true);
        localStorage.setItem("timerStart", Date.now().toString());
      }
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className={`screensaver ${showVideo ? 'show' : ''}`}>
      <video
        autoPlay
        loop
        muted
        className={`video ${showVideo ? 'fade-in' : ''}`}
        onLoadedData={() => setShowVideo(false)}
      >
        <source src={Brigham} type="video/mp4" />
      </video>
    </div>
  );
}

export default ScreenSaver;

