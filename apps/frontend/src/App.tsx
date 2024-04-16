import React, {useCallback} from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import SlidesPageLI from "../src/routes/SlidesPageLI.tsx";
import MapTestingPage from "./routes/MapTestingPage.tsx";
import MapRoute from "./routes/mapRoute.tsx";
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
import MapEditingPage from "./routes/MapEditingPage.tsx";
import FilterManager from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import TypeFilter from "common/src/filter/filters/TypeFilter.ts";
import FloorFilter from "common/src/filter/filters/FloorFilter.ts";
import BuildingFilter from "common/src/filter/filters/BuildingFilter.ts";
import { Auth0Provider } from "@auth0/auth0-react";
import CalenderPage from "./routes/CalenderPage.tsx";

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
          path: "/Services/DeviceDeliveryService",
          element: <DeviceDeliveryService />,
        },
        {
          path: "/DisplayDatabase",
          element: <DisplayDatabase />,
        },

        {
          path: "/Calender",
          element: <CalenderPage />,
        },

        {
          path: "/Login",
          element: <LoginForm />,
        },

        {
          path: "/Map",
          element: <MapRoute />,
        },
        {
          path: "/LoggedIn",
          element: <SlidesPageLI />,
        },
        {
          path: "/MapTestingPage",
          element: <MapTestingPage />,
        },
        {
          path: "/MapEditingPage",
          element: <MapEditingPage />,
        },
      ],
    },
  ]);

  const registerFilters = useCallback(() => {
    FilterManager.getInstance().registerFilter(
      FilterName.TYPE,
      () => new TypeFilter(),
    );
    FilterManager.getInstance().registerFilter(
      FilterName.FLOOR,
      () => new FloorFilter(),
    );
    FilterManager.getInstance().registerFilter(
      FilterName.BUILDING,
      () => new BuildingFilter(),
    );
  }, []);

  registerFilters();
  return <RouterProvider router={router} />;
  function Root() {
    const navigate = useNavigate();
    return (
      <Auth0Provider
        useRefreshTokens
        cacheLocation={"localstorage"}
        domain={"dev-1bg6tdr43pzdkebi.us.auth0.com"}
        clientId={"0GjFZHbJMAaFS5GabTqBigkvkkMxneR9"}
        onRedirectCallback={(appState) => {
          navigate(appState?.returnTo || window.location.pathname);
        }}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "/api",
          scope: "openid profile email offline_access",
        }}
      >
        <div className="w-full flex flex-col px-0 gap-5">
          <Outlet />
        </div>
      </Auth0Provider>
    );
  }
}

export default App;
