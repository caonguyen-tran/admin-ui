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
  const { current, dispatch } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await APIs.post(endpoints["auth-token"], user);

      let token = res.data.data

      let role = await authApi(token).get(endpoints["user-roles"]);
      let listRole = role.data.data;

      let isAdmin = false;
      listRole.map((item) => {
        if (item.name === "ADMIN") {
          isAdmin = true;
        }
      });

      if (!isAdmin) {
        setLoading(false);
        alert("Not Allowed!");
        return;
      }

      dispatch({
        type: "LOGIN",
        payload: {
          role: "ADMIN",
          username: user.username, 
          token: token
        }
      });
      console.log(current)
      navigate("/user-page");

      setLoading(false);
    } catch (ex) {
      setLoading(false);
      alert("Loi dang nhap!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin</h2>
        <form className="mt-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-gray-600 text-left">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Username"
              onChange={(e) => {
                inputChange(e, "username");
              }}
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
              placeholder="••••••••"
              onChange={(e) => {
                inputChange(e, "password");
              }}
              required
            />
          </div>
          <div className="mt-6">
            {loading ? (
              <div className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white">
                <Loading size={30} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Log In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
