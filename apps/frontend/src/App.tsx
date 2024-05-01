import React, { useCallback } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import MapTestingPage from "./routes/MapTestingPage.tsx";
import MapRoute from "./routes/mapRoute.tsx";
import ServicesPage from "./routes/ServicesPage.tsx";
import FlowerDeliveryService from "./routes/FlowerDeliveryService.tsx";
import DisplayDatabase from "./routes/DisplayDatabase.tsx";
//import LoginForm from "./routes/LoginForm.tsx";
import SlidesPage from "./routes/SlidesPage.tsx";
import SanitationService from "./routes/SanitationService.tsx";
import DeviceDeliveryService from "./routes/DeviceDeliveryService.tsx";
import GiftDeliveryService from "./routes/GiftDeliveryService.tsx";
import SecurityService from "./routes/SecurityService.tsx";
import MedicineDelivery from "./routes/MedicineDelivery.tsx";
import RoomScheduling from "./routes/RoomScheduling.tsx";
import FilterManager from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import TypeFilter from "common/src/filter/filters/TypeFilter.ts";
import FloorFilter from "common/src/filter/filters/FloorFilter.ts";
import BuildingFilter from "common/src/filter/filters/BuildingFilter.ts";
import { Auth0Provider } from "@auth0/auth0-react";
import TopBanner from "./components/banner/TopBanner.tsx";
import { Auth0Protection } from "./components/auth0/Auth0Protection.tsx";
import MapEditingPage from "./routes/MapEditingPage.tsx";
import CalendarPage from "./routes/CalendarPage.tsx";
import AboutPage from "./routes/AboutPage.tsx";
import CreditsPage from "./routes/CreditsPage.tsx";
import CheckOutPage from "./routes/CheckOutPage.tsx";
import PathfindingPage from "./routes/PathfindingPage.tsx";
import ScreenSaver from "./components/homepage/ScreenSaver.tsx";
import HealthCalculator from "./routes/HealthCalculator.tsx";
import PageNotFound from "./routes/PageNotFound.tsx";

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
          path: "/About",
          element: <AboutPage />,
        },
        {
          path: "/Services",
          element: <Auth0Protection component={ServicesPage} />,
        },
        {
          path: "/Services/FlowerDelivery",
          element: <Auth0Protection component={FlowerDeliveryService} />,
        },
        {
          path: "/Services/GiftDelivery",
          element: <Auth0Protection component={GiftDeliveryService} />,
        },
        {
          path: "/Services/MedicineDelivery",
          element: <Auth0Protection component={MedicineDelivery} />,
        },
        {
          path: "/Services/RoomScheduling",
          element: <Auth0Protection component={RoomScheduling} />,
        },
        {
          path: "/Services/SanitationService",
          element: <Auth0Protection component={SanitationService} />,
        },
        {
          path: "/Services/SecurityService",
          element: <Auth0Protection component={SecurityService} />,
        },
        {
          path: "/Services/DeviceDeliveryService",
          element: <Auth0Protection component={DeviceDeliveryService} />,
        },
        {
          path: "/DisplayDatabase",
          element: <Auth0Protection component={DisplayDatabase} />,
        },
        {
          path: "/Services/Calendar",
          element: <Auth0Protection component={CalendarPage} />,
        },
        {
          path: "/Cart",
          element: <Auth0Protection component={CheckOutPage} />,
        },
        {
          path: "/Calculator",
          //element: <Auth0Protection component={HealthCalculator} />,
          element: <HealthCalculator />,
        },
        {
          path: "/map",
          element: <PathfindingPage />,
        },
        {
          path: "/mapold",
          element: <MapRoute />,
        },
        {
          path: "/Credits",
          element: <CreditsPage />
        },

        {
          path: "/MapTestingPage",
          element: <Auth0Protection component={MapTestingPage} />,
        },
        {
          path: "/MapEditingPage",
          element: <Auth0Protection component={MapEditingPage} />,
        },
        {
          path: "map/:startnode/:endnode",
          element: <PathfindingPage />,
        },
        {
          path: "*",
          element: <PageNotFound />,
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
          <ScreenSaver />
          <TopBanner />
          <Outlet />
        </div>
      </Auth0Provider>
    );
  }
}

export default App;
