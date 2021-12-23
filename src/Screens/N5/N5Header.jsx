import React, { Component } from "react";
import { Box, Button, Center, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";

class N5Header extends Component {
  render() {
    return (
      <HStack spacing={12} alignItems="start">
        <Center borderRadius="2xl" backgroundColor="teal.50" width={56} height={56}>
          <Heading size="4xl" fontWeight="bold" textColor="teal.500">
            N5
          </Heading>
        </Center>

        <VStack paddingY={4} alignItems="start">
          <Heading size="xl" fontWeight="bold" letterSpacing="tight" textColor="teal.700">
            JLPT N5 Test
          </Heading>
          <Text fontWeight="medium" textColor="gray.500" paddingTop={4}>
            Pick the test by unit in JLPT N5 course (from unit 1 to unit 25)
          </Text>
          <HStack spacing={4} paddingTop={4}>
            <Button variant="solid" colorScheme="teal">
              Start now
            </Button>
            <Button variant="outline" colorScheme="teal">
              Want to learning
            </Button>
          </HStack>
        </VStack>
      </HStack>
    );
  }
}

export default N5Header;
