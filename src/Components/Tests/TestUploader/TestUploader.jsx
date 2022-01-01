import React, { Component, memo } from "react";
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  VStack,
} from "@chakra-ui/react";

import TestUploaderItem from "./TestUploaderItem.jsx";

const IMPORT_FILES = "IMPORT_FILES";
const ADD_INFO = "ADD_INFO";

/**
 * @param {Boolean} isOpen
 * @param {Event} onBeginUpload
 * @param {Event} onEndUpload
 */
class Uploader extends Component {
  state = {
    step: IMPORT_FILES,
    newTests: new Array(),
    // newTests: [
    //   {
    //     name: "BAI TAP 1",
    //     filePath: "D:/Download/BAI TAP 1.json",
    //   },
    // ],
  };

  handleDraggedData = (event) => {
    event.preventDefault();

    this.setState({ step: IMPORT_FILES });
  };

  handleDroppedData = async (event) => {
    event.preventDefault();

    const newTests = Array.from(this.state.newTests);

    const { files } = event.dataTransfer;
    for (const file of files) {
      if (file.type == "application/json") {
        if (newTests.findIndex((test) => test.filePath == file.path) == -1)
          // If the New Test is not exist in the newTests
          newTests.push({
            name: this.formatTestName(file.name),
            filePath: file.path,
          });

        continue;
      }

      if (file.type == "") {
        const JSONFiles = await window.nativeAPI.scanJSON(file.path);
        // Find all JSON File that not exist in the newTests
        const newJSONFiles = JSONFiles.filter(
          (newJSONFile) => newTests.findIndex((test) => test.filePath == newJSONFile.filePath) == -1
        );
        const newTestWorkers = newJSONFiles.map((newJSONFile) => ({
          name: this.formatTestName(newJSONFile.fileName),
          filePath: newJSONFile.filePath,
        }));

        newTests.push(...newTestWorkers);
      }
    }

    this.setState({ newTests, step: ADD_INFO });
  };

  handleDrawerClosed = () => {
    this.setState({ newTests: new Array(), step: IMPORT_FILES });
    this.props.onClose();
  };

  formatTestName = (name) => {
    return name
      .toLowerCase()
      .trim()
      .split(/\s+/g)
      .map((word) => word[0].toUpperCase().concat(word.slice(1)))
      .join(" ");
  };

  render() {
    const { step, newTests } = this.state;
    const { colorScheme, isOpen, onSuccess } = this.props;

    return (
      <Drawer placement="bottom" isOpen={isOpen} onClose={this.handleDrawerClosed}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Uploading your Tests</DrawerHeader>
          <DrawerBody onDragOver={this.handleDraggedData} onDrop={this.handleDroppedData}>
            {step == IMPORT_FILES && (
              <Box width="100%" paddingTop={8}>
                <Center>
                  <Heading textColor={`${colorScheme}.500`}>Drop your JSON file here 🪄</Heading>
                </Center>
              </Box>
            )}

            {step == ADD_INFO && (
              <VStack spacing={8} alignItems="stretch">
                {newTests.map((test) => (
                  <TestUploaderItem
                    name={test.name}
                    filePath={test.filePath}
                    key={test.filePath}
                    colorScheme={colorScheme}
                    onSuccess={onSuccess}
                  />
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}

export default memo(Uploader);
