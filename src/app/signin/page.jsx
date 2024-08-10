"use client";
import React, { useDebugValue, useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import styles from "../styles/styles.module.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Divider,
  Flex,
  HStack,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputRightElement,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import utils from "../../utils/utils";
import ScaleLoader from "react-spinners/ScaleLoader";
import { firebase_app } from "../../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
function Signin() {
  const auth = getAuth(firebase_app);
  const toast = useToast();
  const router = useRouter();
  const { setuserEmail, setAccesstoken } = useAuth();
  let errorsObject = {
    EmailMessage: "",
    PasswordMessage: "",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(errorsObject);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [details, SetDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleEMail = (e) => {
    setEmail(e.target.value);
    if (email != "") {
      setIsEmailError(false);
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 8) {
      setIsPasswordError(false);
    }
  };
  const handleClick = () => setShow(!show);

  const OnSubmit = async () => {
    var userDetails = {
      EMail: email,
      Password: password,
    };
    if (email == "") {
      setErrorMessage((prev) => {
        return { ...prev, EmailMessage: "E-Mail is required" };
      });
      setIsEmailError(true);
    }
    if (password.length <= 8) {
      setErrorMessage((prev) => {
        return {
          ...prev,
          PasswordMessage: "Password should be more than 8 characters",
        };
      });
      setIsPasswordError(true);
    }
    if (password.length > 8 && email != "") {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setuserEmail(user.email);
          setAccesstoken(user.accessToken);
          localStorage.setItem(
            "auth",
            JSON.stringify({
              userEmail: user.email,
              accesstoken: user.accessToken,
            })
          );
          return router.push("/dashboard");
          setIsLoading(false);
        })
        .catch((error) => {
          toast(utils.getToastNotification("error", error.message));
        });
    }
  };
  return (
    <Box className={styles.cardContainer}>
      <Card backgroundColor="transparent" boxShadow="6px 6px 5px">
        <Stack className={styles.cardBody}>
          <CardBody>
            <FormControl isInvalid={isEmailError}>
              <FormHelperText color="white" as="b">
                Email
              </FormHelperText>
              <Input
                type="email"
                size="md"
                fontWeight="700"
                variant="flushed"
                onChange={handleEMail}
                autoComplete="off"
                color="#f6f6f6"
              />
              {!isEmailError ? (
                <FormHelperText />
              ) : (
                <FormErrorMessage as="b">
                  {errorMessage.EmailMessage}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isPasswordError}>
              <FormHelperText color="white" as="b">
                Password
              </FormHelperText>
              <InputGroup size="md">
                <Input
                  size="md"
                  fontWeight="700"
                  type={show ? "text" : "password"}
                  variant="flushed"
                  color="#f6f6f6"
                  onChange={handlePassword}
                />
                <InputRightElement width="2.5rem">
                  {show ? (
                    <ViewIcon
                      onClick={handleClick}
                      className={styles.viewIcon}
                    />
                  ) : (
                    <ViewOffIcon
                      onClick={handleClick}
                      className={styles.viewIcon}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              {!isPasswordError ? (
                <FormHelperText />
              ) : (
                <FormErrorMessage as="b">
                  {errorMessage.PasswordMessage}
                </FormErrorMessage>
              )}
            </FormControl>
          </CardBody>
          <CardFooter pt={0}>
            <Flex direction="column">
              <Button
                className={styles.registerBtn}
                variant="solid"
                colorScheme="#312ab3"
                onClick={OnSubmit}
              >
                {isLoading ? (
                  <Box>
                    <ScaleLoader
                      loading={isLoading}
                      height={15}
                      color="white"
                    />
                  </Box>
                ) : (
                  "SIGN IN"
                )}
              </Button>
              <Text marginTop="5px" color="white">
                If you are not yet registred ? Please click on{" "}
                <span>
                  <a className={styles.loginLink} href="/signup">
                    signup
                  </a>
                </span>
              </Text>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}

export default Signin;
