import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserThunk } from "../../features/auth/authThunk";
import LoadingScreen from "../common/LoadingScreen";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { initializing  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  if (initializing ) return <LoadingScreen />;

  return children;
}

export default AuthInitializer;
