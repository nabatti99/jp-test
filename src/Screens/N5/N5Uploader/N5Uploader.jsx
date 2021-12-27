import React, { Component, Fragment } from "react";
import { Box, Center, DrawerBody, DrawerHeader, Heading, VStack } from "@chakra-ui/react";

import N5UploaderItem from "./N5UploaderItem.jsx";

class N5Uploader extends Component {
  state = {
    step: "uploading",
    metadataList: [
      {
        name: "BAI TAP 1",
        filePath: "D:/Download/BAI TAP 1.json",
      },
    ],
  };

  handleDraggedData = (event) => {
    event.preventDefault();
  };

  handleDroppedData = async (event) => {
    event.preventDefault();

    const metadataList = new Array();

    const { files } = event.dataTransfer;
    for (const file of files) {
      if (file.type == "application/json") {
        metadataList.push({
          name: file.name,
          filePath: file.path,
        });
      }
    }

    console.log(metadataList);
    this.setState({ metadataList, step: "addMetadata" });
  };

  render() {
    return (
      <Fragment>
        <DrawerHeader>Uploading your files</DrawerHeader>
        <DrawerBody>
          {this.state.step == "uploading" && (
            <Box width="100%" paddingY={8} onDragOver={this.handleDraggedData} onDrop={this.handleDroppedData}>
              <Center>
                <Heading>Drop your JSON file here</Heading>
              </Center>
            </Box>
          )}

          {this.state.step == "addMetadata" && (
            <VStack spacing={8} alignItems="stretch">
              {this.state.metadataList.map((metadata) => (
                <N5UploaderItem name={metadata.name} filePath={metadata.filePath} key={metadata.filePath} />
              ))}
            </VStack>
          )}
        </DrawerBody>
      </Fragment>
    );
  }
}

export default N5Uploader;
