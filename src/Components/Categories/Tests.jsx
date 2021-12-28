import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Center, Divider, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import { changeTest } from "../../redux/actions";

function Tests({ level, unitTitle, changeTest, timestamp }) {
  const [tests, setTests] = useState(new Array());

  useEffect(() => {
    async function getTests() {
      const testFolders = await window.nativeAPI.readDir(level, unitTitle);
      console.log(testFolders);
      const testWorks = testFolders.map(async (testFolder) => {
        let result = {
          title: testFolder,
          type: "Unknown",
          history: null,
        };

        try {
          const summary = await window.nativeAPI.readSummary(level, unitTitle, testFolder);
          result = summary;
        } catch (error) {
          console.error(error);
          window.nativeAPI.saveJSON(level, unitTitle, testFolder, "summary", result);
        }

        return result;
      });

      const tests = await Promise.all(testWorks);
      setTests(tests);
    }

    getTests();
  }, [timestamp]);

  return (
    <Box>
      <SimpleGrid columns={3} gap={4} paddingTop={16}>
        {tests.map((test, index) => (
          <Box
            key={test.title}
            paddingY={4}
            paddingX={4}
            borderRadius="lg"
            borderWidth={1}
            borderColor="transparent"
            role="group"
            _hover={{ borderColor: `teal.500` }}
            transitionDuration="0.24s"
            cursor="pointer"
            onClick={() => changeTest(level, unitTitle, test.title)}
          >
            <HStack alignItems="start" spacing={4}>
              <VStack alignItems="stretch">
                <Center>
                  <Center
                    width={16}
                    height={16}
                    borderRadius="full"
                    backgroundColor="teal.50"
                    borderWidth={1}
                    borderColor="transparent"
                    _groupHover={{ borderColor: "teal.500" }}
                    transitionDuration="0.24s"
                  >
                    <Heading as="h3" fontSize="lg" textColor="teal.500" letterSpacing="tight">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </Heading>
                  </Center>
                </Center>
                <Box
                  paddingX="2"
                  backgroundColor="teal.50"
                  borderWidth={1}
                  borderColor="transparent"
                  _groupHover={{ borderColor: "teal.500" }}
                  transitionDuration="0.24s"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="0.6rem"
                    textColor="teal.500"
                    textAlign="center"
                    letterSpacing="wider"
                    style={{ textTransform: "uppercase" }}
                  >
                    {test.type}
                  </Text>
                </Box>
              </VStack>
              <VStack alignItems="start" spacing={2}>
                <Heading as="h3" fontWeight="bold" fontSize="md" textColor="teal.500" paddingTop={2}>
                  {test.title}
                </Heading>

                <Divider borderColor="teal.500" />

                <Box>
                  <Text fontWeight="bold" fontSize="sm" textColor="gray.500">
                    {test.history ? `Done at: ${new Date().toDateString()}` : "Haven't done yet"}
                  </Text>
                  {test.history && (
                    <Text fontWeight="bold" fontSize="sm" textColor="teal.400">
                      Result: {`${test.history.numTrueAnswers}/${test.history.numQuestions}`}
                    </Text>
                  )}
                </Box>
              </VStack>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  level: state.level,
  unitTitle: state.unit,
  timestamp: state.timestamp,
});

const mapDispatchToProps = (dispatch) => ({
  changeTest: (level, unit, test) => dispatch(changeTest(level, unit, test)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tests);
