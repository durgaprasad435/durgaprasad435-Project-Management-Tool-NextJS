"use client";
import { Box, Text } from "@chakra-ui/react";
import styles from "../app/styles/styles.module.css";
export default function Home() {
  return (
    <Box className={styles.Homepage}>
      <Box className={styles.headerAndLinks}>
        <Text fontSize="4xl" as="em" fontWeight="bold">
          Project Handler
        </Text>
        <Box className={styles.headerFields}>
          <a href="/signup">
            <Text mr={6}>SIGN UP</Text>
          </a>
          <a href="/signin">
            <Text>SIGN IN</Text>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
