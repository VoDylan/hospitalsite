import React, { useState, useEffect } from "react";
import Brigham from "../../videos/Brigham.mp4";
import "./ScreenSaveFade.css";

function ScreenSaver() {
  const [showVideo, setShowVideo] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Adjust the type
  const [startScreenSaverOnLoad, setStartScreenSaverOnLoad] = useState(false); // Flag to control whether screen saver starts on load

  useEffect(() => {
    const resetTimer = () => {
      if (timer) clearTimeout(timer); // Clear existing timer
      setTimer(setTimeout(() => setShowVideo(true), 600000)); // Set a new timer
    };

    // Event listener for user activity
    const handleUserActivity = () => {
      setShowVideo(false); // Hide the video instantly on user activity
      resetTimer(); // Reset the timer on user activity
    };

    // Event listener for keyboard input
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Insert") {
        setShowVideo(true); // Start the screen saver when "insert" key is pressed
        resetTimer(); // Reset the timer when screen saver starts
      }
    };

    // Start the screen saver on page load if the flag is set
    if (startScreenSaverOnLoad) {
      setShowVideo(true);
      resetTimer();
    } else {
      // Set up initial timer and event listeners if not starting the screen saver on load
      resetTimer();
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);
      window.addEventListener("scroll", handleUserActivity);
      window.addEventListener("keydown", handleKeyPress); // Add event listener for keydown
    }

    // Clean up event listeners and timer
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("keydown", handleKeyPress); // Remove event listener for keydown
      if (timer) clearTimeout(timer); // Clear any remaining timer
    };
  }, [startScreenSaverOnLoad, timer]); // Re-run effect only once on component mount

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





