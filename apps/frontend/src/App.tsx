import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Map from "./routes/map.tsx";

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
    return (
      // <div className="w-full flex flex-col px-20 gap-5">
        <Outlet />
      // {/*</div>*/}
    );
  }
}

export default App;
