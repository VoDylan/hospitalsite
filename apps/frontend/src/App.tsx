import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Map from "./routes/map.tsx";

//import ExampleRoute from "./routes/ExampleRoute.tsx";
import ServicesPage from "./routes/ServicesPage.tsx";
import HeroPage from "./routes/HeroPage.tsx";
import FlowerDeliveryService from "./routes/FlowerDeliveryService.tsx";
import DisplayDatabase from "./routes/DisplayDatabase.tsx";
import DisplayServiceReqs from "./routes/DisplayServiceReqs.tsx";
import LoginForm from "./routes/LoginForm.tsx";
// import MapPage from "./routes/MapPage.tsx";
import SlidesPage from "./routes/SlidesPage.tsx";
// import Map from "./routes/map.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <HeroPage />,
        },
        {
          path: "/Services",
          element: <ServicesPage />,
        },
        {
          path: "/Services/FlowerDelivery",
          element: <FlowerDeliveryService />,
        },
        {
          path: "/DisplayDatabase",
          element: <DisplayDatabase />,
        },
        {
          path: "/DisplayServiceReqs",
          element: <DisplayServiceReqs />,
        },
        {
          path: "/Login",
          element: <LoginForm />,
        },

        {
          path: "/Slides",
          element: <SlidesPage />,
        },

        {
          path: "/Map",
          element: <Map />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="w-full flex flex-col px-0 gap-5">
        <Outlet />
      </div>
    );
  }
}

export default App;
