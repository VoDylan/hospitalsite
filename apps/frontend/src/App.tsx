import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Map from "./routes/map.tsx";
// import TestAnimation from "./routes/testAnimation.tsx";
// import MapWithMouseCoordinates from "./routes/mapWithMouseCoordinates.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "map",
          element: <Map />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return <Outlet />;
  }
}

export default App;
