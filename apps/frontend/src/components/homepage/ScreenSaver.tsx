import React, { useState, useEffect } from "react";

function ScreenSaver() {
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowBox(true);
      }, 5000); // 5 seconds for testing purposes, change to 5 * 60 * 1000 for 5 minutes
    };

    const handleUserActivity = () => {
      setShowBox(false);
      resetTimer();
    };

    // Initial setup and event listeners
    resetTimer();
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    // Clean up event listeners
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
    };
  }, []);

  return (
    <div style={{ position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 99999999,
      visibility: showBox ? 'visible' : 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.65)' }} />
  );
}

export default ScreenSaver;
