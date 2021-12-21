import React, { Component } from "react";
import { Box, Button, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react";

import QuickTest from "./QuickTest.jsx";
import UnitTest from "./UnitTest.jsx";

class Home extends Component {
  render() {
    return (
      <Box>
        <Container maxWidth="container.lg">
          <Box marginTop={8} marginStart={8}>
            <Text fontWeight="medium" fontSize="xl" textColor="gray.500">
              Practice your self with
            </Text>
            <Heading as="h1" size="4xl" textColor="teal.400" letterSpacing="tighter">
              Japanese Test
            </Heading>
            <Text fontWeight="medium" fontSize="3xl" textColor="gray.500" marginTop={6}>
              Easy - Quick - Free
            </Text>

            <HStack marginTop={8}>
              <Button variant="solid" colorScheme="teal">
                Get Started
              </Button>
              <Button variant="outline" colorScheme="teal" leftIcon={<h1>icon</h1>}>
                Download
              </Button>
            </HStack>

            <QuickTest />

            <UnitTest />
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Home;
