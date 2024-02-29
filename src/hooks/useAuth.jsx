import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, auth?.user ? "user looged in" : "user log out");
  return useContext(AuthContext);
};

export default useAuth;
