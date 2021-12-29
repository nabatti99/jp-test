import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Center, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import BooksIcon from "../Icons/BooksIcon.jsx";
import CupIcon from "../Icons/CupIcon.jsx";
import LampDeskIcon from "../Icons/LampDeskIcon.jsx";
import CircleXMarkIcon from "../Icons/CircleXMarkIcon.jsx";

import { changeTest } from "../../redux/actions";

import "animate.css";

class Units extends Component {
  state = {
    units: new Array(),
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Update content after uploaded
    if (prevProps.timestamp != this.props.timestamp) this.getUnitData();
  }

  componentDidMount() {
    this.getUnitData();
  }

  getUnitData = () => {
    window.nativeAPI
      .readDir(this.props.level)
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
  };

  getTestsInUnit = async (unitFolder) => {
    return window.nativeAPI.readDir(this.props.level, unitFolder).then((testFolders) => {
      const testWorks = testFolders.map((testFolder) => ({
        title: testFolder,
        summary: `${testFolder}_summary.json`,
      }));

      return Promise.all(testWorks);
    });
  };

  render() {
    const { colorScheme, level, changeTest } = this.props;

    return (
      <Box>
        {this.state.units.length == 0 && (
          <Center paddingY={16} className="animate__animated animate__fadeIn">
            <VStack>
              <CircleXMarkIcon boxSize={16} color="red.400" />
              <Heading textColor="red.500" paddingTop={4}>
                Oh no! Nothing here.
              </Heading>
              <Text fontWeight="medium" textColor="gray.500">
                Drag and drop your JSON file test to upload 😇
              </Text>
            </VStack>
          </Center>
        )}
        <SimpleGrid columns={5} gap={4} paddingTop={16}>
          {this.state.units.map((unit, index) => (
            <Box
              key={unit.title}
              borderRadius="xl"
              role="group"
              backgroundColor={`${colorScheme}.50`}
              borderWidth={1}
              borderColor="transparent"
              _hover={{ borderColor: `${colorScheme}.500` }}
              transitionDuration="0.24s"
              className="animate__animated animate__bounceIn"
              cursor="pointer"
              overflow="hidden"
              onClick={() => changeTest(level, unit.title, null)}
            >
              <VStack alignItems="stretch" spacing={0}>
                <Center paddingTop={8} paddingBottom={8} position="relative" overflow="hidden">
                  <Center>
                    <Heading as="h3" size="2xl" textColor={`${colorScheme}.600`} letterSpacing="tight">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </Heading>
                  </Center>

                  <BooksIcon
                    boxSize={12}
                    position="absolute"
                    bottom={0}
                    right={0}
                    opacity={0.15}
                    color={`${colorScheme}.500`}
                  />

                  <LampDeskIcon
                    boxSize={20}
                    position="absolute"
                    bottom={0}
                    left={-4}
                    opacity={0.05}
                    color={`${colorScheme}.500`}
                  />

                  <CupIcon
                    boxSize={6}
                    position="absolute"
                    bottom={0}
                    left={12}
                    opacity={0.2}
                    color={`${colorScheme}.500`}
                  />
                </Center>
                <Text
                  fontWeight="bold"
                  textColor="white"
                  textAlign="center"
                  backgroundColor={`${colorScheme}.500`}
                  paddingTop={2}
                  paddingBottom={2}
                >
                  {unit.title}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  level: state.level,
  timestamp: state.timestamp,
});

const mapDispatchToProps = (dispatch) => ({
  changeTest: (level, unit, test) => dispatch(changeTest(level, unit, test)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Units);
