import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//import ExampleRoute from "./routes/ExampleRoute.tsx";
import LoginForm from "./routes/LoginPage.tsx";
import ServicesPage from "./routes/ServicesPage.tsx";
import FlowerDeliveryService from "./routes/FlowerDeliveryService.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <LoginForm />,
        },
        {
          path: "/Services",
          element: <ServicesPage />,
        },
        {
          path: "/FlowerDelivery",
          element: <FlowerDeliveryService />,
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
