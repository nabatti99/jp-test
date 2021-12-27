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
import { Link } from "react-router-dom";

class N5Test extends Component {
  state = {
    units: new Array(),
    isUploading: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("Did Update");
    // console.log(prevState);
    // console.log(this.state);
  }

  componentDidMount() {
    window.nativeAPI
      .readDir("N5")
      .then((unitFolders) => {
        const unitWorks = unitFolders.map((unitFolder) => {
          const unit = {
            title: unitFolder,
            tests: new Array(),
          };

          return this.getTestsInUnit(unitFolder).then((tests) => {
            unit.tests = tests;
            return unit;
          });
        });

        return Promise.all(unitWorks);
      })
      .then((units) => this.setState({ units }));
  }

  getTestsInUnit = async (unitFolder) => {
    return window.nativeAPI.readDir("N5", unitFolder).then((testFolders) => {
      const testWorks = testFolders.map((testFolder) => ({
        title: testFolder,
        summary: `${testFolder}_summary.json`,
      }));

      return Promise.all(testWorks);
    });
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
          {this.state.units.map((unit, index) => (
            <Link to={`unit/${unit.title}`} key={unit.title}>
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
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </Heading>
                  </Center>
                  <Text fontWeight="bold" textColor={`teal.500`} paddingTop={2}>
                    {unit.title}
                  </Text>
                </VStack>
              </Box>
            </Link>
          ))}
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
