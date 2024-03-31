import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Map from "./routes/map.tsx";
// import BFSCombo from "./routes/BFScombo.tsx";
import AnimatedMap from "./routes/animatedMap.tsx";
// import {BFSalgorithm} from "./routes/BFSalgorithm.ts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "map",
          element: <AnimatedMap />,
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
