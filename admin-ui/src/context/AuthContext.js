import { createContext, useContext, useReducer } from "react";
import { DispatchReducer } from './../reducer/Reducer';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


const savedUser = localStorage.getItem("authData");
const initialState = savedUser ? { user: JSON.parse(savedUser) } : { user: null };

export const AuthProvider = ({ children }) => {
  const [current, dispatch] = useReducer(DispatchReducer, initialState);

  return (
    <AuthContext.Provider value={{ current, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
