"use client";
import React, { useState } from "react";
import styles from "../styles/styles.module.css";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Text,
  Button,
  Input,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import utils from "../../utils/utils";
import ScaleLoader from "react-spinners/ScaleLoader";
import { firebase_app } from "../../firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
function Signup() {
  const auth = getAuth(firebase_app);
  const toast = useToast();
  const router = useRouter();
  let errorsObject = {
    EmailMessage: "",
    PasswordMessage: "",
    ReEnteredPassword: "",
  };
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(errorsObject);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isReEnteredPasswordError, setIsReEnteredPasswordError] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [details, SetDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPaswordsSame, setIsPaswordsSame] = useState(false);

  const handleEMail = (e) => {
    setEMail(e.target.value);
    if (eMail != "") {
      setIsEmailError(false);
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 8) {
      setIsPasswordError(false);
    }
  };
  const handelReEnteredPassword = (e) => {
    setReEnterPassword(e.target.value);
    if (e.target.value.length > 8) {
      if (e.target.value === password) {
        setIsPaswordsSame(true);
        setIsReEnteredPasswordError(false);
      } else if (e.target.value != password) {
        setIsReEnteredPasswordError(true);
        setIsPaswordsSame(false);
      } else {
        setIsReEnteredPasswordError(false);
      }
    } else if (e.target.value == "") {
      setIsReEnteredPasswordError(true);
      setErrorMessage((prev) => {
        return {
          ...prev,
          ReEnteredPasswordMessage: "Re-enter password.",
        };
      });
    } else {
      setIsReEnteredPasswordError(true);
      setIsPaswordsSame(false);
      setErrorMessage((prev) => {
        return {
          ...prev,
          ReEnteredPasswordMessage: "Passwords do not match.",
        };
      });
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleReShowPassword = () => {
    setShowRePassword(!showRePassword);
  };
  const OnSubmit = async () => {
    var userDetails = {
      EMail: eMail,
      Password: password,
    };
    if (eMail == "") {
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
    if (reEnterPassword.length <= 8) {
      setErrorMessage((prev) => {
        return {
          ...prev,
          ReEnteredPasswordMessage: "Passwords do not match.",
        };
      });
      setIsReEnteredPasswordError(true);
    }
    if (password != "" && password === reEnterPassword) {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, eMail, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          return router.push("/signin");
          setIsLoading(false);
        })
        .catch((error) => {
          toast(utils.getToastNotification("error", "User already exists"));
          setIsLoading(false);
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
                fontWeight="700"
                type="email"
                size="md"
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
                  fontWeight="700"
                  size="md"
                  type={showPassword ? "text" : "password"}
                  variant="flushed"
                  onChange={handlePassword}
                  color="#f6f6f6"
                />
                <InputRightElement width="2.5rem">
                  {showPassword ? (
                    <ViewIcon
                      onClick={handleShowPassword}
                      className={styles.viewIcon}
                    />
                  ) : (
                    <ViewOffIcon
                      onClick={handleShowPassword}
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
            <FormControl isInvalid={isReEnteredPasswordError}>
              <FormHelperText color="white" as="b">
                Confirm Password
              </FormHelperText>
              <InputGroup size="md">
                <Input
                  size="md"
                  fontWeight="700"
                  type="password"
                  variant="flushed"
                  color="#f6f6f6"
                  onChange={handelReEnteredPassword}
                />
              </InputGroup>
              {isPaswordsSame && (
                <FormHelperText color="green" as="b">
                  Paswords match
                </FormHelperText>
              )}
              {!isReEnteredPasswordError ? (
                <FormHelperText />
              ) : (
                <FormErrorMessage as="b">
                  {errorMessage.ReEnteredPasswordMessage}
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
                  "SIGN UP"
                )}
              </Button>
              <Text marginTop="5px" color="white">
                If you are already registred. Please click on{" "}
                <span>
                  <a className={styles.loginLink} href="/signin">
                    signin
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

export default Signup;
