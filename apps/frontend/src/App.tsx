import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SlidesPageLI from "../src/routes/SlidesPageLI.tsx";
import MapTestingPage from "./routes/MapTestingPage.tsx";
import Map from "./routes/map.tsx";
import ServicesPage from "./routes/ServicesPage.tsx";
import FlowerDeliveryService from "./routes/FlowerDeliveryService.tsx";
import DisplayDatabase from "./routes/DisplayDatabase.tsx";
import LoginForm from "./routes/LoginForm.tsx";
import SlidesPage from "./routes/SlidesPage.tsx";
import SanitationService from "./routes/SanitationService.tsx";
import DeviceDeliveryService from "./routes/DeviceDeliveryService.tsx";
import GiftDeliveryService from "./routes/GiftDeliveryService.tsx";
import SecurityService from "./routes/SecurityService.tsx";
import MedicineDelivery from "./routes/MedicineDelivery.tsx";
import RoomScheduling from "./routes/RoomScheduling.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <SlidesPage />,
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
          path: "/Services/GiftDelivery",
          element: <GiftDeliveryService />,
        },
        {
          path: "/Services/MedicineDelivery",
          element: <MedicineDelivery />,
        },
        {
          path: "/Services/RoomScheduling",
          element: <RoomScheduling />,
        },
        {
          path: "/Services/SanitationService",
          element: <SanitationService />,
        },
        {
          path: "/Services/SecurityService",
          element: <SecurityService />,
        },
        {
          path: "/Services/MedicalDeviceDelivery",
          element: <DeviceDeliveryService />,
        },
        {
          path: "/DisplayDatabase",
          element: <DisplayDatabase />,
        },

        {
          path: "/Login",
          element: <LoginForm />,
        },

        {
          path: "/Map",
          element: <Map />,
        },
        {
          path: "/LoggedIn",
          element: <SlidesPageLI />,
        },
        {
          path: "/MapTestingPage",
          element: <MapTestingPage />,
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
