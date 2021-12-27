import React, { useEffect, useState } from "react";
import { Box, Center, Divider, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function N5Tests({ unitTitle }) {
  const [tests, setTests] = useState(new Array());

  useEffect(() => {
    async function getTests() {
      const testFolders = await window.nativeAPI.readDir("N5", unitTitle);
      console.log(testFolders);
      const testWorks = testFolders.map(async (testFolder) => {
        let result = {
          title: testFolder,
          type: "Unknown",
          history: null,
        };

        try {
          const summary = await window.nativeAPI.readSummary("N5", unitTitle, testFolder);
          result = summary;
        } catch (error) {
          console.error(error);
          window.nativeAPI.saveJSON("N5", unitTitle, testFolder, "summary", result);
        }

        return result;
      });

      const tests = await Promise.all(testWorks);
      setTests(tests);
    }

    getTests();
  }, []);

  return (
    <Box>
      <SimpleGrid columns={3} gap={4} paddingTop={16}>
        {tests.map((test, index) => (
          <Link to={`unit/${unitTitle}/test/${test.title}`} key={test.title}>
            <Box
              paddingY={4}
              paddingX={4}
              borderRadius="lg"
              borderWidth={1}
              borderColor="transparent"
              backgroundColor={`teal.50`}
              role="group"
              _hover={{ borderColor: `teal.500` }}
              transitionDuration="0.24s"
              cursor="pointer"
            >
              <HStack alignItems="start" spacing={4}>
                <VStack alignItems="stretch">
                  <Center>
                    <Center
                      width={16}
                      height={16}
                      borderRadius="full"
                      backgroundColor="teal.300"
                      _groupHover={{ backgroundColor: "teal.500" }}
                      transitionDuration="0.24s"
                    >
                      <Heading as="h3" size="lg" textColor="white" letterSpacing="tight">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </Heading>
                    </Center>
                  </Center>
                  <Box
                    paddingX="2"
                    backgroundColor="teal.300"
                    _groupHover={{ backgroundColor: "teal.500" }}
                    transitionDuration="0.24s"
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="0.6rem"
                      textColor="white"
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
                    <Text fontWeight="bold" fontSize="sm" textColor="teal.400">
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
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default N5Tests;
