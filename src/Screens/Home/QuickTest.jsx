import React, { Component } from "react";
import { Box, Button, Container, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import VolumeIcon from "../../Components/Icons/VolumeIcon.jsx";
import TargetIcon from "../../Components/Icons/TargetIcon.jsx";
import GrammarCheckIcon from "../../Components/Icons/GrammarCheckIcon.jsx";

import "animate.css";

class QuickTest extends Component {
  tests = [
    {
      name: "Random Test",
      icon: <TargetIcon boxSize={12} color="teal.700" />,
      description: "Randomly pick questions in your choice JLPT level.",
      colorTheme: "teal",
      isWorking: false,
    },
    {
      name: "Listening Test",
      icon: <VolumeIcon boxSize={12} color="gray.700" />,
      description: "Randomly pick audio questions in your choice JLPT level.",
      colorTheme: "gray",
      isWorking: false,
    },
    {
      name: "Grammar Test",
      icon: <GrammarCheckIcon boxSize={12} color="orange.700" />,
      description: "Randomly pick grammar questions in some JLPT levels with your choice.",
      colorTheme: "orange",
      isWorking: false,
    },
  ];

  render() {
    return (
      <Container maxWidth="container.lg">
        <VStack marginTop={16}>
          <Text textColor="gray.300" fontWeight="medium" fontSize="xx-small" letterSpacing={4}>
            CATEGORIES
          </Text>
          <Heading as="h2" textColor="gray.700" size="lg">
            Quick Tests
          </Heading>

          <SimpleGrid columns={3} spacing={4} paddingTop={8}>
            {this.tests.map((test, index) => (
              <Box
                borderRadius="md"
                borderWidth={1}
                borderColor="transparent"
                backgroundColor={`${test.colorTheme}.50`}
                key={test.name}
                _hover={{ borderColor: `${test.colorTheme}.500` }}
                transitionDuration="0.24s"
                cursor="pointer"
                className={`animate__animated animate__fadeInUp animate__delay-${index}s`}
              >
                <VStack alignItems="stretch" margin={4}>
                  <Box>{test.icon}</Box>
                  <Heading
                    as="h3"
                    size="md"
                    textColor={`${test.colorTheme}.600`}
                    letterSpacing="tight"
                    paddingTop={2}
                  >
                    {test.name}
                  </Heading>
                  <Text fontWeight="medium" textColor={`${test.colorTheme}.400`}>
                    {test.description}
                  </Text>
                  <Flex justifyContent="end">
                    <Button variant="link" colorScheme={test.colorTheme} isDisabled={!test.isWorking}>
                      {test.isWorking ? "Start Now" : "Coming Soon"}
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    );
  }
}

export default QuickTest;
