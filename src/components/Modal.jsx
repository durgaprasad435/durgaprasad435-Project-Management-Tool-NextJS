"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Textarea,
  VStack,
  Tooltip,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Input, Select, useToast } from "@chakra-ui/react";
import styles from "../app/styles/styles.module.css";
import utils from "../utils/utils";

function ModalComponent(props) {
  const { isOpen } = useDisclosure();
  var [task, setTask] = useState("");
  var [showAddTag, SetShowAddTag] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projectstatus, setProjectStatus] = useState("");
  const [exitingDetails, setExistingDetails] = useState({});
  const [upateTask, setUpdateTask] = useState("");
  const [details, setDetails] = useState({
    projectName: "",
    description: "",
    status: "",
    Tasks: [],
    createdAt: new Date(),
  });
  const handleChange = (e) => {
    if (props.isUpdate) {
      setExistingDetails({
        ...exitingDetails,
        [e.target.name]: e.target.value,
      });
    } else {
      setDetails({ ...details, [e.target.name]: e.target.value });
    }
  };
  const handleSelect = (e) => {
    var option = e.target.value;
    setProjectStatus(option);
    details.status = option;
    exitingDetails.status = option;
  };

  const OnSubmitProject = () => {
    if (props.isUpdate) {
      exitingDetails.Tasks = tasks;
      exitingDetails.modifiedAt = new Date();
      props.OnUpdateProject(exitingDetails);
    } else {
      props.OnSubmit(details);
    }
  };
  function OnAddTag() {
    SetShowAddTag(false);
    if (task != null && task != "") {
      OnUpdateTags(task, true);
      setTask("");
    }
  }
  function UpdateTask(e, index) {
    setUpdateTask(e.target.value);
    tasks.splice(index, 1, e.target.value);
  }
  function OnUpdateTags(task, add) {
    if (task == null || task == "") return;
    var ltasks = JSON.parse(JSON.stringify(tasks));
    if (add) {
      ltasks.push(task);
    } else {
      ltasks = ltasks.filter((x) => x != task);
    }
    setTasks(ltasks);
  }
  useEffect(() => {
    if (props.ProjectDetails != null) {
      setExistingDetails(props.ProjectDetails);
      setTasks(props.ProjectDetails.Tasks);
    }
  }, [props.ProjectDetails]);
  return (
    <div>
      <Modal isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {props.isNew ? "Create Project" : "Update Project"}
          </ModalHeader>
          {exitingDetails.modifiedAt !== undefined ? (
            <Box ml={6}>
              <FormControl>
                <FormHelperText>
                  Created Date: {utils.formatDate(exitingDetails.createdAt)}
                </FormHelperText>
              </FormControl>
            </Box>
          ) : null}
          <ModalBody>
            <FormControl isRequired>
              <Box>
                <FormLabel>Project Name :</FormLabel>
                <Input
                  name="projectName"
                  type="text"
                  onChange={handleChange}
                  autocomplete="off"
                  aria-required={true}
                  value={
                    details.projectName != ""
                      ? details.projectName
                      : exitingDetails.projectName
                  }
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <Box>
                <FormLabel>Description :</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Project description...."
                  onChange={handleChange}
                  autocomplete="off"
                  value={
                    details.description != ""
                      ? details.description
                      : exitingDetails.description
                  }
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <Box>
                <FormLabel>Status :</FormLabel>
                <Select
                  placeholder="Choose.."
                  onChange={handleSelect}
                  value={
                    projectstatus != "" ? projectstatus : exitingDetails.status
                  }
                >
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </Select>
              </Box>
            </FormControl>
            {!props.isNew && (
              <Box mt={5}>
                <VStack className={styles.vStack}>
                  {tasks != null ? (
                    <>
                      {tasks.map((task, index) => {
                        return (
                          <Tooltip key={index}>
                            <InputGroup size="md" className={styles.tagsInput}>
                              <Input
                                type="text"
                                value={task}
                                onChange={(e) => {
                                  UpdateTask(e, index);
                                }}
                              />
                              <InputRightElement>
                                <CloseIcon
                                  color="red.500"
                                  boxSize={3}
                                  cursor="pointer"
                                  onClick={() => OnUpdateTags(task, false)}
                                />
                              </InputRightElement>
                            </InputGroup>
                          </Tooltip>
                        );
                      })}
                    </>
                  ) : null}
                  {tasks != null && tasks.length < 5 ? (
                    !showAddTag ? (
                      <IconButton
                        className={styles.taskIcon}
                        variant="outline"
                        borderColor="brand.disabledButtonText"
                        colorScheme="tertiary"
                        onClick={() => {
                          SetShowAddTag(!showAddTag);
                        }}
                      >
                        <Text>Add Tasks</Text>
                      </IconButton>
                    ) : (
                      <InputGroup className={styles.addInput}>
                        <Input
                          value={task}
                          onChange={(e) => setTask(e.target.value)}
                          onCloseIconClick={() => setTask("")}
                        ></Input>
                        <InputRightElement width="3.4rem">
                          <Button
                            className={styles.actionButton}
                            onClick={OnAddTag}
                            colorScheme="purple"
                          >
                            Add
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    )
                  ) : null}
                </VStack>
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="teal"
              mr={3}
              onClick={props.OnModalClose}
            >
              Close
            </Button>
            <Button
              rightIcon={<CheckIcon />}
              colorScheme="green"
              variant="outline"
              onClick={OnSubmitProject}
            >
              {props.isNew ? "Save" : "Update"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalComponent;
