"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "../app/styles/styles.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <Box className={styles.Homepage}>
      <Box className={styles.headerAndLinks}>
        <Text fontSize="4xl" as="em" fontWeight="bold">
          Project Handler
        </Text>
        <Box className={styles.headerFields}>
          <Link href="/signup">
            <Text mr={6}>SIGN UP</Text>
          </Link>
          <Link href="/signin">
            <Text>SIGN IN</Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
