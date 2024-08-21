import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import MainLayout from "./components/MainLayout";

function App() {


  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/*",
      element: (
        <>
          <div className="flex justify-center items-center h-screen">
            Page not found
          </div>
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
