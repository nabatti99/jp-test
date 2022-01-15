import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Center, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import { navigate } from "../../redux/actions";

class UnitTest extends Component {
  tests = [
    {
      name: "N5",
      subtitle: "JLPT N5",
      colorTheme: "teal",
      isAvailable: true,
    },
    {
      name: "N4",
      subtitle: "JLPT N4",
      colorTheme: "blue",
      isAvailable: true,
    },
    {
      name: "N3",
      subtitle: "JLPT N3",
      colorTheme: "pink",
      isAvailable: true,
    },
    {
      name: "N2",
      subtitle: "JLPT N2",
      colorTheme: "purple",
      isAvailable: false,
    },
    {
      name: "N1",
      subtitle: "JLPT N1",
      colorTheme: "gray",
      isAvailable: false,
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
                cursor={test.isAvailable ? "pointer" : "not-allowed"}
                onClick={() => test.isAvailable && this.props.navigate(test.name)}
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
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (screenName) => dispatch(navigate(screenName)),
});

export default connect(null, mapDispatchToProps)(UnitTest);
