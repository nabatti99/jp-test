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

import UploaderItem from "./UploaderItem.jsx";

/**
 * @param {Boolean} isOpen
 * @param {Event} onBeginUpload
 * @param {Event} onEndUpload
 */
class Uploader extends Component {
  IMPORT_FILES = "IMPORT_FILES";
  ADD_INFO = "ADD_INFO";

  state = {
    step: this.IMPORT_FILES,
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

    this.setState({ step: this.IMPORT_FILES });
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
            name: file.name,
            filePath: file.path,
          });
      }
    }

    this.setState({ newTests, step: this.ADD_INFO });
    this.props.onBeginUpload();
  };

  handleDrawerClosed = () => {
    this.setState({ newTests: new Array(), step: this.IMPORT_FILES });
    this.props.onEndUpload();
  };

  render() {
    return (
      <Drawer placement="bottom" isOpen={this.props.isOpen} onClose={this.handleDrawerClosed}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Uploading your Tests</DrawerHeader>
          <DrawerBody onDragOver={this.handleDraggedData} onDrop={this.handleDroppedData}>
            {this.state.step == this.IMPORT_FILES && (
              <Box width="100%" paddingTop={8}>
                <Center>
                  <Heading>Drop your JSON file here</Heading>
                </Center>
              </Box>
            )}

            {this.state.step == this.ADD_INFO && (
              <VStack spacing={8} alignItems="stretch">
                {this.state.newTests.map((metadata) => (
                  <UploaderItem name={metadata.name} filePath={metadata.filePath} key={metadata.filePath} />
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
