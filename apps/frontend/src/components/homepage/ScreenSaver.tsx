import React, { useState, useEffect } from "react";
import Brigham from "../../videos/Brigham.mp4";
import "./ScreenSaveFade.css"; // Import CSS file

function ScreenSaver() {
  const [showVideo, setShowVideo] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Adjust the type

  useEffect(() => {
    // Function to reset the timer
    const resetTimer = () => {
      if (timer) clearTimeout(timer); // Clear existing timer
      setTimer(setTimeout(() => setShowVideo(true), 5000)); // Set a new timer
    };

    // Event listener for user activity
    const handleUserActivity = () => {
      resetTimer(); // Reset the timer on user activity
      setShowVideo(false); // Hide the video instantly on user activity
    };

    // Set up initial timer and event listeners
    resetTimer();
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    // Clean up event listeners and timer
    return () => {
      if (timer) clearTimeout(timer); // Clear any remaining timer
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
    };
  }, [timer]); // Re-run effect when timer changes

  return (
    <div className={`screensaver ${showVideo ? 'show' : ''}`}>
      <video
        autoPlay
        loop
        muted
        className={`video ${showVideo ? 'fade-in' : ''}`}
        onLoadedData={() => setShowVideo(true)}
      >
        <source src={Brigham} type="video/mp4" />
      </video>
    </div>
  );
}

export default ScreenSaver;




