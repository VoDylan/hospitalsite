import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ScreenSaver from "./components/homepage/ScreenSaver.tsx";

function SlideInBox() {
  const [showBox, setShowBox] = useState(false);

  const toggleBox = () => {
    setShowBox(prevState => !prevState);
  };

  return (
    <React.StrictMode>
      <ScreenSaver/>
      <App />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SlideInBox />
);
