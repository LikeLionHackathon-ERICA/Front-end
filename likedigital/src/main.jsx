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
import SignUp from "./pages/SignUp.jsx";
import Mypage from "./pages/Mypage.jsx";
import Class from "./pages/Class.jsx";
import ClassDetail from "./pages/ClassDetail.jsx";
import Maps from "./pages/Maps.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import Map from "./components/Map.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectService />,
    index: true,
  },
  {
    path: "/login/:userType",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
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
        path: "register/map",
        element: <Map />,
      },
      {
        path: "posts/list",
        element: <ProblemView />,
      },
      {
        path: "problem/:id",
        element: <ProblemDetail />,
      },

      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "class",
        element: <Class />,
      },
      {
        path: "class/:id",
        element: <ClassDetail />,
      },
      {
        path: "maps",
        element: <Maps />,
      },
      {
        path: "posts/:id",
        element: <PostsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
