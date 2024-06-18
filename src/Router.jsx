import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Root from "./pages/Root";
import { StepperWithContent } from "./pages/Stepper";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    children: [
      { path: "/", element: <StepperWithContent/> },
      { path: "/posts", element: <Posts /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
