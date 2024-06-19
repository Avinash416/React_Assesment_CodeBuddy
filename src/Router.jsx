import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
import Posts from "./pages/Posts";
import { StepperWithContent } from "./pages/Stepper";
import Root from "./pages/Root";
import "./pages/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <StepperWithContent /> },
      { path: "/posts", element: <Posts /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
