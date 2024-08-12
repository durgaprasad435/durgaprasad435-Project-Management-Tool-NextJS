"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../app/context/authContext";

export function Providers({ children }) {
  return (
    <CacheProvider>
      <AuthProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
