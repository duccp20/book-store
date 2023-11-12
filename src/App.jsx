import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  Footer,
  FooterAdmin,
  Header,
  HeaderAdmin,
  Home,
  Loading,
  NotFound,
} from "./components";
import { Book, Dashboard, LoginPage, RegisterPage } from "./pages";
import { callFetchAccount } from "./service/api";
import { useDispatch, useSelector } from "react-redux";
import {
  doFetchAccountAction,
  doRedirectLogin,
} from "./redux/account/accountSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Layout = () => {
  console.log("In layout");
  return (
    <div className="wrapper">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

const LayoutAdmin = () => {
  console.log("in layout admin");
  const role = useSelector((state) => state.account.user.role);
  return (
    <div>
      {role === "ADMIN" && <HeaderAdmin></HeaderAdmin>}

      <Outlet></Outlet>

      {role === "ADMIN" && <FooterAdmin></FooterAdmin>}
    </div>
  );
};

export default function App() {
  const isLoading = useSelector((state) => state.account.isLoading);
  console.log(isLoading, "isLoading in APP");
  const dispatch = useDispatch();
  const fetchAccount = async () => {
    console.log("in fetch account");
    if (
      window.location.pathname === "/register" ||
      window.location.pathname === "/login"
    )
      return;

    const res = await callFetchAccount();
    console.log(res, "callFetchAccount");
    if (res && res?.data) {
      dispatch(doFetchAccountAction(res.data.user));
    }

    if (res.statusCode === 401) {
      dispatch(doRedirectLogin(false));
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "book",
          element: <Book />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      {!isLoading ||
      window.location.pathname === "/" ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
