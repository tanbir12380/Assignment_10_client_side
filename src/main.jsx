import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Root.jsx";
import Home from "./Home.jsx";
import AllBills from "./AllBills.jsx";
import BillDetails from "./BillDetails.jsx";
import AuthProvider from "./AuthProvider.jsx";
import LogIn from "./LogIn";
import Registration from "./Register.jsx";
import MyBills from "./MyBills.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/bills",
        element:  <AllBills></AllBills>,
      },
      {
        path: "/bills/:id",
        element:<PrivateRoute><BillDetails></BillDetails></PrivateRoute>  ,
      },
      {
        path: '/login',
        element:<LogIn></LogIn>
      }
      ,{
        path:'/register',
        element:<Registration></Registration>
      },
      {
        path:'/mybills',
        element:<PrivateRoute><MyBills></MyBills></PrivateRoute>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
