import React, { Component } from "react";
import { Box, Center, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

class UnitTest extends Component {
  tests = [
    {
      name: "N5",
      subtitle: "JLPT N5",
      colorTheme: "teal",
    },
    {
      name: "N4",
      subtitle: "JLPT N4",
      colorTheme: "blue",
    },
    {
      name: "N3",
      subtitle: "JLPT N3",
      colorTheme: "green",
    },
    {
      name: "N2",
      subtitle: "JLPT N2",
      colorTheme: "purple",
    },
    {
      name: "N1",
      subtitle: "JLPT N1",
      colorTheme: "red",
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
            Unit Tests
          </Heading>

          <SimpleGrid columns={5} spacing={4} paddingTop={8}>
            {this.tests.map((test) => (
              <Link to={test.name} key={test.name}>
                <Box
                  paddingY={4}
                  paddingX={8}
                  key={test.name}
                  borderRadius="lg"
                  borderWidth={1}
                  borderColor="transparent"
                  role="group"
                  _hover={{ borderColor: `${test.colorTheme}.500` }}
                  transitionDuration="0.24s"
                  cursor="pointer"
                >
                  <VStack>
                    <Center
                      width={24}
                      height={24}
                      borderRadius="full"
                      backgroundColor={`${test.colorTheme}.50`}
                      _groupHover={{ backgroundColor: `${test.colorTheme}.100` }}
                      transitionDuration="0.24s"
                    >
                      <Heading as="h3" size="md" textColor={`${test.colorTheme}.600`} letterSpacing="tight">
                        {test.name}
                      </Heading>
                    </Center>
                    <Text fontWeight="bold" textColor={`${test.colorTheme}.500`} paddingTop={2} paddingBottom={4}>
                      {test.subtitle}
                    </Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    );
  }
}

export default UnitTest;
