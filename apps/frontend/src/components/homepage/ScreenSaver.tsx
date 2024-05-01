import React, { useState, useEffect } from "react";
import Brigham from "../../videos/Brigham.mp4";
import "./ScreenSaveFade.css";

function ScreenSaver() {
  const [showVideo, setShowVideo] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Adjust the type


  useEffect(() => {
    const resetTimer = () => {
      if (timer) clearTimeout(timer); // Clear existing timer
      const timerStart = localStorage.getItem("timerStart");
      if (timerStart) {
        const elapsed = Date.now() - parseInt(timerStart, 10);
        const remaining = 60000 * 20 - elapsed;
        if (remaining > 0) {
          setTimer(setTimeout(() => setShowVideo(false), remaining)); // Set a new timer with remaining time
        } else {
          setShowVideo(true); // If timer has elapsed, show the video immediately
        }
      } else {
        setShowVideo(false); // If timer start time is not set, show the video immediately
      }
      localStorage.setItem("timerStart", Date.now().toString()); // Store current time as timer start time
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

    // Set up initial timer and event listeners if not starting the screen saver on load
    resetTimer();
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("keydown", handleKeyPress); // Add event listener for keydown

    // Clean up event listeners and timer
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("keydown", handleKeyPress); // Remove event listener for keydown
      if (timer) clearTimeout(timer); // Clear any remaining timer
    };
  }, [timer]); // Re-run effect only when timer changes

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
