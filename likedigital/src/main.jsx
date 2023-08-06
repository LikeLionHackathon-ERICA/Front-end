import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProblemView from "./pages/ProblemView.jsx";
import Error from "./pages/Error.jsx";
import SelectService from "./pages/SelectService.jsx";
import ProblemDetail from "./pages/ProblemDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/select-service",
    element: <SelectService />,
    index: true,
  },
  {
    path: "/login/:userType",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "home", element: <Home /> },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "problem",
        element: <ProblemView />,
      },
      {
        path: "problem/:id",
        element: <ProblemDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
