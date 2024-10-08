"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Button,
  Stack,
  InputGroup,
  InputRightElement,
  Input,
  Text,
  Tooltip,
  ListItem,
  UnorderedList,
  Card,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { EditIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import RiseLoader from "react-spinners/RiseLoader";
import ModalComponent from "../../components/Modal";
import utils from "../../utils/utils";
import styles from "../styles/styles.module.css";
import { db } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "@firebase/firestore";
import { useAuth } from "../context/authContext";
import axios from "axios";
function Dashboard() {
  const [allProjects, setAllProjects] = useState([]);
  const [isaddNew, setAddNew] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [project, setProject] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const { userEmail, accesstoken, setuserEmail, setAccesstoken } = useAuth();

  useEffect(() => {
    var authDetails = GetAuthDetails();
    if (authDetails != null) {
      async function GetAllProjects() {
        try {
          setIsLoading(true);
          const projectsRef = await getDocs(collection(db, "projects"));
          var allproj = [];
          projectsRef.forEach((doc) => {
            allproj.push({ id: doc.id, ...doc.data() });
          });
          setAllProjects(allproj);
          setIsLoading(false);
        } catch (error) {
          toast(
            utils.getToastNotification(
              "error",
              "Error while getting all projects."
            )
          );
          setIsLoading(false);
        }
      }
      GetAllProjects();
    } else {
      router.push("/signin");
    }
  }, []);
  const GetAuthDetails = () => {
    var authorizedUser = utils.getAuthDetails();
    if (authorizedUser != null) {
      setuserEmail(authorizedUser.userEmail);
      setAccesstoken(authorizedUser.accesstoken);
    }
    return authorizedUser;
  };
  const handleSearch = (term) => {
    setSearchItem(term);
  };
  const FilterAllProjects = (projects, term) => {
    var items = projects;
    if (term == null && term != null) {
      term = searchItem;
    }
    if (term != null && term != "") {
      items = projects.filter((x) =>
        x.projectName.toLowerCase().includes(term.toLowerCase())
      );
    }
    return items;
  };
  const OnModalClose = () => {
    setAddNew(false);
    setIsUpdate(false);
    setProject([]);
  };
  const OnEdit = (project) => {
    GetSingleProject(project);
  };
  const OnUpdateProject = async (data) => {
    try {
      setIsLoading(true);
      setIsUpdate(false);
      const response = await axios.put("api/updateproject", data);
      setAllProjects(response.data.data);
      setIsLoading(false);
      setProject([]);
    } catch (error) {
      toast(
        utils.getToastNotification("error", "Error while updating project.")
      );
    }
  };
  const GetSingleProject = async (project) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "api/getproject/" + `${project.projectId}`
      );
      setProject(response.data.data);
      setIsUpdate(true);
      setIsLoading(false);
    } catch (error) {
      toast(
        utils.getToastNotification("error", "Error while getting project.")
      );
    }
  };
  const OnSubmit = async (data) => {
    try {
      if (
        data.projectName == "" ||
        data.description == "" ||
        project.status == ""
      ) {
        toast(
          utils.getToastNotification("error", "Please, Enter project details")
        );
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setAddNew(false);
        const response = await axios.post("api/addproject", data);
        setAllProjects(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast(utils.getToastNotification("error", "Error while adding project."));
      setIsLoading(false);
    }
  };
  const OnLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <Box>
      <Box className={styles.headerAndLinks} bgColor="#8854d1">
        <Text fontSize="4xl" as="em" fontWeight="bold">
          Project Handler
        </Text>
        <Box className={styles.headerFields}>
          <Menu>
            <Tooltip placement="left-end" label={userEmail}>
              <MenuButton>
                <Avatar
                  className="profile-photo"
                  bg="red.500"
                  boxSize="2em"
                  name={userEmail}
                />
              </MenuButton>
            </Tooltip>
            <MenuList>
              <MenuItem className={styles.menuList} onClick={OnLogout}>
                LOGOUT
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      {isLoading ? (
        <Box className={styles.loading}>
          <RiseLoader loading={isLoading} size={12} color="#b218f5" />
        </Box>
      ) : (
        <Card className={styles.Card}>
          <Box className={styles.projectsPage}>
            <Box className={styles.buttons}>
              <Stack>
                <InputGroup>
                  <Input
                    className={styles.searchbar}
                    placeholder="Search..."
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchItem}
                  />
                  <InputRightElement>
                    {searchItem != "" ? (
                      <CloseIcon
                        cursor="pointer"
                        color="#7b1cd5"
                        onClick={() => handleSearch("")}
                      />
                    ) : (
                      <SearchIcon color="#7b1cd5" />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Button
                colorScheme="purple"
                ml={8}
                onClick={() => {
                  setAddNew(true);
                }}
              >
                Add Project
              </Button>
            </Box>
            <Box>
              <Box className={styles.projectsContainer}>
                {FilterAllProjects(allProjects, searchItem).map(
                  (item, index) => {
                    return (
                      <Box key={index}>
                        <Accordion allowMultiple>
                          <AccordionItem>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                <FormControl>
                                  <Box className={styles.statusField}>
                                    Project Name :
                                    <Text ml={3} fontWeight="600">
                                      {item.projectName}{" "}
                                    </Text>
                                  </Box>

                                  <Box className={styles.statusField}>
                                    Status :{" "}
                                    <Text
                                      ml={3}
                                      color={
                                        item.status === "Active"
                                          ? "green"
                                          : "red"
                                      }
                                      fontWeight="bold"
                                    >
                                      {item.status}
                                    </Text>
                                  </Box>
                                </FormControl>
                              </Box>
                              <Box flex="1" textAlign="right">
                                <Tooltip label="Edit">
                                  <EditIcon
                                    marginRight="15px"
                                    onClick={() => {
                                      OnEdit(item);
                                    }}
                                  />
                                </Tooltip>
                                <FormControl>
                                  {item.modifiedAt != null ? (
                                    <FormHelperText>
                                      Modified At :{" "}
                                      {utils.formatDate(item.modifiedAt)}
                                    </FormHelperText>
                                  ) : (
                                    <FormHelperText>
                                      Created At :{" "}
                                      {utils.formatDate(item.createdAt)}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel pb={4}>
                              <Box className={styles.statusField}>
                                Description :
                                <Text ml={3} fontWeight="600">
                                  {item.description}{" "}
                                </Text>
                              </Box>
                              {item.Tasks.length >= 1 && (
                                <Box>
                                  <Text color="">Active Tasks :</Text>
                                  {item.Tasks.map((t, ind) => {
                                    return (
                                      <UnorderedList key={ind}>
                                        <ListItem fontWeight="600">
                                          {t}
                                        </ListItem>
                                      </UnorderedList>
                                    );
                                  })}
                                </Box>
                              )}
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </Box>
                    );
                  }
                )}
              </Box>
            </Box>
            {isaddNew || isUpdate ? (
              <ModalComponent
                isOpen={true}
                OnModalClose={OnModalClose}
                isNew={isaddNew}
                isUpdate={isUpdate}
                OnSubmit={OnSubmit}
                ProjectDetails={project}
                OnUpdateProject={OnUpdateProject}
              />
            ) : null}
          </Box>
        </Card>
      )}
    </Box>
  );
}

export default Dashboard;
