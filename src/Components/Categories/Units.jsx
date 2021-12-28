import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Center, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import { changeTest } from "../../redux/actions";

import Uploader from "../Uploader/Uploader.jsx";

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
    console.log("Render Units");
    return (
      <Box>
        <SimpleGrid columns={5} gap={4} paddingTop={16}>
          {/* Need to make component */}
          {this.state.units.map((unit, index) => (
            <Box
              key={unit.title}
              borderRadius="xl"
              role="group"
              backgroundColor="teal.50"
              borderWidth={1}
              borderColor="transparent"
              _hover={{ borderColor: "teal.500" }}
              transitionDuration="0.24s"
              cursor="pointer"
              overflow="hidden"
              onClick={() => this.props.changeTest(this.props.level, unit.title, null)}
            >
              <VStack alignItems="stretch">
                <Center paddingTop={4}>
                  <Center
                    width={24}
                    height={24}
                    borderRadius="full"
                    borderWidth={1}
                    borderColor="transparent"
                    _groupHover={{ borderColor: "teal.500" }}
                    transitionDuration="0.24s"
                  >
                    <Heading as="h3" size="lg" textColor={`teal.600`} letterSpacing="tight">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </Heading>
                  </Center>
                </Center>
                <Text
                  fontWeight="bold"
                  textColor="white"
                  textAlign="center"
                  backgroundColor="teal.500"
                  paddingTop={2}
                  paddingBottom={4}
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
