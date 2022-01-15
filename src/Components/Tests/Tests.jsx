import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Center, Divider, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import "animate.css";

import CircleXMarkIcon from "../Icons/CircleXMarkIcon.jsx";
import TestUploader from "./TestUploader/TestUploader.jsx";

import { changeTest } from "../../redux/actions";
import Trash from "../Trash/Trash.jsx";

function Tests({ level, section, unit, changeTest, colorScheme }) {
  const [tests, setTests] = useState(new Array());
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTests, setSelectedTest] = useState(new Array());

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

  const handleTestClicked = (test) => {
    if (!isDeleting) changeTest(level, section, unit, test);
  };

  let selectTimer = null;
  const handleTestMouseDown = (test) => {
    const currentSelectedTests = selectedTests;
    const index = currentSelectedTests.findIndex((item) => item == test);

    if (isDeleting) {
      if (index > -1) {
        const selectedTests = [...currentSelectedTests.slice(0, index), ...currentSelectedTests.slice(index + 1)];
        setSelectedTest(selectedTests);
      } else {
        const selectedTests = [...currentSelectedTests, test];
        setSelectedTest(selectedTests);
      }
    } else
      selectTimer = setTimeout(() => {
        const selectedTests = [...currentSelectedTests, test];
        setIsDeleting(true);
        setSelectedTest(selectedTests);
      }, 1000);
  };

  const handleTestMouseUp = () => {
    clearTimeout(selectTimer);
  };

  const handleTestsDeleted = () => {
    setIsDeleting(false);
    setSelectedTest(new Array());

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
        <VStack marginTop={16} className="animate__animated animate__fadeIn">
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
        {tests.map((test, index) => {
          const { title } = test;
          const isSelected = selectedTests.findIndex((item) => item == title) > -1;
          const testColorScheme = isSelected ? "red" : colorScheme;

          return (
            <Box
              key={title}
              paddingY={4}
              paddingX={4}
              borderRadius="lg"
              borderWidth={1}
              borderColor="transparent"
              role="group"
              _hover={{ borderColor: `${testColorScheme}.500` }}
              transitionDuration="0.24s"
              className="animate__animated animate__fadeIn"
              cursor="pointer"
              onClick={() => handleTestClicked(title)}
              onMouseDown={() => handleTestMouseDown(title)}
              onMouseUp={() => handleTestMouseUp(title)}
            >
              <HStack alignItems="start" spacing={4}>
                <VStack alignItems="stretch">
                  <Center>
                    <Center
                      width={16}
                      height={16}
                      borderRadius="full"
                      backgroundColor={`${testColorScheme}.50`}
                      borderWidth={1}
                      borderColor="transparent"
                      _groupHover={{ borderColor: `${testColorScheme}.500` }}
                      transitionDuration="0.24s"
                    >
                      <Heading as="h3" size="lg" textColor={`${testColorScheme}.500`} letterSpacing="tight">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </Heading>
                    </Center>
                  </Center>
                  <Box
                    paddingX="2"
                    backgroundColor={`${testColorScheme}.50`}
                    borderWidth={1}
                    borderColor="transparent"
                    _groupHover={{ borderColor: `${testColorScheme}.500` }}
                    transitionDuration="0.24s"
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="0.6rem"
                      textColor={`${testColorScheme}.500`}
                      textAlign="center"
                      letterSpacing="wider"
                      style={{ textTransform: "uppercase" }}
                    >
                      {test.type}
                    </Text>
                  </Box>
                </VStack>
                <VStack alignItems="start" spacing={2}>
                  <Heading
                    as="h3"
                    fontWeight="bold"
                    fontSize="md"
                    textColor={`${testColorScheme}.500`}
                    paddingTop={2}
                  >
                    {title}
                  </Heading>

                  <Divider borderColor={`${testColorScheme}.500`} />

                  <Box>
                    <Text fontWeight="bold" fontSize="sm" textColor="gray.500">
                      {test.history ? `Done at: ${new Date().toDateString()}` : "Haven't done yet"}
                    </Text>
                    {test.history && (
                      <Text fontWeight="bold" fontSize="sm" textColor={`${testColorScheme}.400`}>
                        Result: {`${test.history.numTrueAnswers}/${test.history.numQuestions}`}
                      </Text>
                    )}
                  </Box>
                </VStack>
              </HStack>
            </Box>
          );
        })}
      </SimpleGrid>

      {tests.length > 0 && (
        <HStack justifyContent="space-between" alignItems="end" marginTop={4}>
          <Text color="gray.300" fontWeight="medium" fontSize={"small"}>
            🪄 Long press on Test Item to select!
          </Text>
          <Trash
            colorScheme={colorScheme}
            isActive={isDeleting}
            selectedItems={selectedTests.map((test) => [level, section, unit, test])}
            onDelete={handleTestsDeleted}
          />
        </HStack>
      )}

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
