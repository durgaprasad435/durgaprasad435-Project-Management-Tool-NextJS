// context/authContext.js
"use client";
import { createContext, useState, useEffect, useContext } from "react";
import utils from "../../utils/utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setuserEmail] = useState(null);
  const [accesstoken, setAccesstoken] = useState(null);
  useEffect(() => {
    console.log("auth");
  }, []);
  return (
    <AuthContext.Provider
      value={{ userEmail, setuserEmail, setAccesstoken, accesstoken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
