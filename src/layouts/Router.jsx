import { createBrowserRouter } from "react-router";
import MainLayout from "./MianLayout";
import Home from "../pages/Home";
import Movies from "../pages/Movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies/>,
      },
    ],
  },
]);

export default router;
