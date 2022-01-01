import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Center, Divider, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import "animate.css";

import CircleXMarkIcon from "../Icons/CircleXMarkIcon.jsx";
import TestUploader from "./TestUploader/TestUploader.jsx";

import { changeTest } from "../../redux/actions";

function Tests({ level, section, unit, changeTest, colorScheme, timestamp }) {
  const [tests, setTests] = useState(new Array());
  const [isUploading, setIsUploading] = useState(false);

  const getTests = async () => {
    const testFolders = await window.nativeAPI.readDir(level, section, unit);

    const testWorks = testFolders.map(async (testFolder) => {
      let result = {
        title: testFolder,
        type: "Unknown",
        history: null,
      };

      try {
        const summary = await window.nativeAPI.readSummary(level, section, unit, testFolder);
        result = summary;
      } catch (error) {
        console.error(error);
        window.nativeAPI.saveJSON("summary", result, level, section, unit, testFolder);
      }

      return result;
    });

    const tests = await Promise.all(testWorks);
    setTests(tests);
  };

  useEffect(() => {
    getTests();
  }, []);

  const handleBeginAddTest = (event) => {
    event.preventDefault();
    setIsUploading(true);
  };

  const handleEndAddTest = () => {
    setIsUploading(false);
  };

  const handleAddTestSuccessful = () => {
    getTests();
  };

  return (
    <Box onDragOver={handleBeginAddTest}>
      <VStack marginTop={8}>
        <Text
          textColor="gray.300"
          fontWeight="medium"
          fontSize="xx-small"
          letterSpacing={4}
          textTransform="uppercase"
        >
          {section}
        </Text>
        <Heading as="h2" textColor={`${colorScheme}.700`} size="lg">
          {unit}
        </Heading>
      </VStack>

      {tests.length == 0 && (
        <VStack marginTop={8} className="animate__animated animate__fadeIn">
          <CircleXMarkIcon boxSize={16} color="red.400" />
          <Heading textColor="red.500" paddingTop={4}>
            Oh no! Nothing here.
          </Heading>
          <Text fontWeight="medium" textColor="gray.500">
            Drag and drop your JSON file test to upload 😇
          </Text>
        </VStack>
      )}

      <SimpleGrid columns={3} gap={4} marginTop={8}>
        {tests.map((test, index) => (
          <Box
            key={test.title}
            paddingY={4}
            paddingX={4}
            borderRadius="lg"
            borderWidth={1}
            borderColor="transparent"
            role="group"
            _hover={{ borderColor: `${colorScheme}.500` }}
            transitionDuration="0.24s"
            className="animate__animated animate__fadeIn"
            cursor="pointer"
            onClick={() => changeTest(level, section, unit, test.title)}
          >
            <HStack alignItems="start" spacing={4}>
              <VStack alignItems="stretch">
                <Center>
                  <Center
                    width={16}
                    height={16}
                    borderRadius="full"
                    backgroundColor={`${colorScheme}.50`}
                    borderWidth={1}
                    borderColor="transparent"
                    _groupHover={{ borderColor: `${colorScheme}.500` }}
                    transitionDuration="0.24s"
                  >
                    <Heading as="h3" size="lg" textColor={`${colorScheme}.500`} letterSpacing="tight">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </Heading>
                  </Center>
                </Center>
                <Box
                  paddingX="2"
                  backgroundColor={`${colorScheme}.50`}
                  borderWidth={1}
                  borderColor="transparent"
                  _groupHover={{ borderColor: `${colorScheme}.500` }}
                  transitionDuration="0.24s"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="0.6rem"
                    textColor={`${colorScheme}.500`}
                    textAlign="center"
                    letterSpacing="wider"
                    style={{ textTransform: "uppercase" }}
                  >
                    {test.type}
                  </Text>
                </Box>
              </VStack>
              <VStack alignItems="start" spacing={2}>
                <Heading as="h3" fontWeight="bold" fontSize="md" textColor={`${colorScheme}.500`} paddingTop={2}>
                  {test.title}
                </Heading>

                <Divider borderColor={`${colorScheme}.500`} />

                <Box>
                  <Text fontWeight="bold" fontSize="sm" textColor="gray.500">
                    {test.history ? `Done at: ${new Date().toDateString()}` : "Haven't done yet"}
                  </Text>
                  {test.history && (
                    <Text fontWeight="bold" fontSize="sm" textColor={`${colorScheme}.400`}>
                      Result: {`${test.history.numTrueAnswers}/${test.history.numQuestions}`}
                    </Text>
                  )}
                </Box>
              </VStack>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>

      <TestUploader
        colorScheme={colorScheme}
        isOpen={isUploading}
        onSuccess={handleAddTestSuccessful}
        onClose={handleEndAddTest}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  level: state.level,
  section: state.section,
  unit: state.unit,
  section: state.section,
});

const mapDispatchToProps = (dispatch) => ({
  changeTest: (level, section, unit, test) => dispatch(changeTest(level, section, unit, test)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tests);
