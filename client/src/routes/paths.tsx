import { lazy, Suspense } from "react";
import CustomLoadingOverlay from "../components/customLoading/CustomLoadingOverlay";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute/protectedRoute";

const Loadable =
  (Component: React.FC) => (props: typeof Component.propTypes) => {
    return (
      <Suspense fallback={<CustomLoadingOverlay />}>
        <Component {...props} />
      </Suspense>
    );
  };

  const Register=Loadable(lazy(() => import("../pages/registerPage/registerPage")));
  const Login=Loadable(lazy(() => import("../pages/loginPage/loginPage")));
  const Home=Loadable(lazy(() => import("../pages/home/homePage")));
  const Chat=Loadable(lazy(() => import("../pages/ChatPage/Chat")));
  export default function AppRoutes(){

    return useRoutes([
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        ),
      }
    ]);



  }
  