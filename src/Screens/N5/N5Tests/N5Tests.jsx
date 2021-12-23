import React, { Component } from "react";
import {
  Box,
  Center,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { colorWithOpacity } from "../../../utilities/colorGenerator";

import N5Uploader from "../N5Uploader/N5Uploader.jsx";

class N5Test extends Component {
  state = {
    tests: [
      {
        unit: 1,
        title: "Bài 1",
        categories: [
          {
            title: "Bài tập bài 1",
            path: "./",
            type: "summary",
            isCompleted: false,
          },
        ],
      },
    ],
    isUploading: false,
  };

  handleDraggedData = (event) => {
    this.setState({ isUploading: true });
  };

  handleDrawerClosed = () => {
    this.setState({ isUploading: false });
  };

  render() {
    return (
      <Box onDragOver={this.handleDraggedData}>
        <SimpleGrid columns={5} gap={4} paddingTop={16}>
          {/* Need to make component */}
          <Box
            paddingY={4}
            paddingX={8}
            borderRadius="lg"
            borderWidth={1}
            borderColor="transparent"
            role="group"
            _hover={{ borderColor: `teal.500` }}
            transitionDuration="0.24s"
            cursor="pointer"
          >
            <VStack>
              <Center
                width={24}
                height={24}
                borderRadius="full"
                backgroundColor={`teal.50`}
                _groupHover={{ backgroundColor: `teal.100` }}
                transitionDuration="0.24s"
              >
                <Heading as="h3" size="lg" textColor={`teal.600`} letterSpacing="tight">
                  01
                </Heading>
              </Center>
              <Text fontWeight="bold" textColor={`teal.500`} paddingTop={2}>
                Bài tập bài 1
              </Text>
              <Text fontWeight="medium" fontSize="sm" textColor="gray.500" textAlign="center" paddingBottom={4}>
                Chưa hoàn thành
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>

        <Drawer placement="bottom" isOpen={this.state.isUploading}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton onClick={this.handleDrawerClosed} />

            <N5Uploader onDone={this.handleDrawerClosed} />
          </DrawerContent>
        </Drawer>
      </Box>
    );
  }
}

export default N5Test;
