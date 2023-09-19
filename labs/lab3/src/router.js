import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Home from "./Home";
import NotFound from "./NotFound";
import ConfirmOrder from "./ConfirmOrder";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "compose-salad",
        element: <ComposeSalad />,
      },
      {
        path: "view-order",
        element: <ViewOrder />,
        children: [
          {
            path: "confirm/:id",
            element: <ConfirmOrder />,

          }
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  },
]);

export default router
