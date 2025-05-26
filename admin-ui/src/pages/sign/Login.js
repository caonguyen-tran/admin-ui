import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import APIs, { authApi, endpoints } from "../../APIs/APIs";
import Loading from "../../common/Loading";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const inputChange = (event, field) => {
    setUser((current) => {
      return { ...current, [field]: event.target.value };
    });
  };

  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res = await APIs.post(endpoints["auth-token"], user);
      let token = res.data.data;

      let role = await authApi(token).get(endpoints["user-roles"]);
      let listRole = role.data.data;

      let isAdmin = false;
      listRole.map((item) => {
        if (item.name === "ADMIN") {
          isAdmin = true;
        }
      });

      if (!isAdmin) {
        setError("Access denied. Admin privileges required.");
        setLoading(false);
        return;
      }

      // Save auth data to localStorage
      const authData = {
        role: "ADMIN",
        username: user.username,
        token: token,
      };

      // Update context
      dispatch({
        type: "LOGIN",
        payload: authData,
      });

      navigate("/user-page");
    } catch (ex) {
      setError("Invalid username or password");
      console.error("Login error:", ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form className="mt-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-gray-600 text-left">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your username"
              onChange={(e) => inputChange(e, "username")}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-gray-600 text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your password"
              onChange={(e) => inputChange(e, "password")}
              required
            />
          </div>
          <div className="mt-6">
            {loading ? (
              <div className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white">
                <Loading size={30} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
