import { lazy, Suspense } from "react";
import CustomLoadingOverlay from "../components/customLoading/CustomLoadingOverlay";
import { useRoutes } from "react-router-dom";

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
  export default function AppRoutes(){

    return useRoutes([
        {
            path:"/register",
            element:<Register/>
        },
        {
            path:"/login",
            element:<Login/>
        }

    ])



  }
  