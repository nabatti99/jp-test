import React, { Component } from "react";
import { Box, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

class QuickTest extends Component {
  tests = [
    {
      name: "Random Test",
      icon: <Text>Text</Text>,
      description: "Randomly pick questions in some JLPT levels with your choice.",
      colorTheme: "teal",
    },
    {
      name: "Random Test 1",
      icon: <Text>Text</Text>,
      description: "Randomly pick questions in some JLPT levels with your choice.",
      colorTheme: "gray",
    },
    {
      name: "Random Test 2",
      icon: <Text>Text</Text>,
      description: "Randomly pick questions in some JLPT levels with your choice.",
      colorTheme: "orange",
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
            {this.tests.map((test) => (
              <Box
                borderRadius="md"
                borderWidth={1}
                borderColor="transparent"
                backgroundColor={`${test.colorTheme}.50`}
                height="12rem"
                key={test.name}
                _hover={{ borderColor: `${test.colorTheme}.500` }}
                transitionDuration="0.24s"
                cursor="pointer"
              >
                <VStack alignItems="start" margin={4}>
                  {test.icon}
                  <Heading as="h3" size="md" textColor={`${test.colorTheme}.600`} letterSpacing="tight">
                    {test.name}
                  </Heading>
                  <Text fontWeight="medium" textColor={`${test.colorTheme}.400`}>
                    {test.description}
                  </Text>
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
