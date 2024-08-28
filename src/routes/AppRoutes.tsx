import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404/>
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
