import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import CustomLoadingOverlay from "../customLoading/CustomLoadingOverlay";
import { getUserData } from "../../redux/userSlice";
import { useAuth } from "../../context/authContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, success, error, loading,user } = useAppSelector(
    (state) => state.user
  );
  const token =useAuth();

  console.log("isAuthenticated", isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && token) {
      dispatch(getUserData())
        .unwrap()
        .catch(() => {
          navigate("/login");
        });
    } else if (!token) {
      navigate("/login");
    }
  }, [dispatch, user, navigate, token]);

  if (loading) return <CustomLoadingOverlay />;
  if(error) return <p>{error}</p>;

  return <>{children}</>;

}
