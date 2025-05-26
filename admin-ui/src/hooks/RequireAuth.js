import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authApi, securityEndpoints } from "../APIs/APIs";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const { current } = useAuth();

  useEffect(() => {
    const checkToken = async () => {
      const data = localStorage.getItem("authData");
      if (!data) {
        setIsValid(false);
        return <Navigate to="/login" replace />;
      }

      try {
        let token = JSON.parse(data).token;
        const response = await authApi(token).post(securityEndpoints["introspect-token"]);

        setIsValid(response.data.valid);
      } catch (err) {
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  if (isValid === false){
    localStorage.removeItem("authData");
    return <Navigate to="/login" replace />;
  };

  if (!current?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
