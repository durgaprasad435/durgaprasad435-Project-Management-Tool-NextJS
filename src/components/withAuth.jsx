"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/authContext";
import utils from "../utils/utils";
export default function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const { setuserEmail, setAccesstoken } = useAuth();
    useEffect(() => {
      var authDetails = utils.getAuthDetails();
      if (authDetails != null) {
        setuserEmail(authDetails.userEmail);
        setAccesstoken(authDetails.accesstoken);
      }
      if (authDetails == null) {
        return router.push("/signin");
      }
    }, []);
    return <Component {...props} />;
  };
}
