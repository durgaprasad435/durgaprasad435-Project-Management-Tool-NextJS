// context/authContext.js
"use client";
import { createContext, useState, useEffect, useContext } from "react";
import utils from "../../utils/utils";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setuserEmail] = useState(null);
  const [accesstoken, setAccesstoken] = useState(null);
  const router = useRouter();
  return (
    <AuthContext.Provider
      value={{ userEmail, setuserEmail, setAccesstoken, accesstoken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
