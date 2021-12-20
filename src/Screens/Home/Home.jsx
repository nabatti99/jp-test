import React, { Component } from "react";
import { Box, Button, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react";

class Home extends Component {
  render() {
    return (
      <Box>
        <Container maxWidth="container.lg">
          <Box marginTop={8} marginStart={8}>
            <Text fontWeight="light" fontSize="xl" textColor="gray.500">
              Practice your self with
            </Text>
            <Heading as="h1" size="2xl" textColor="gray.700">
              Japanese Test
            </Heading>
            <Text fontWeight="light" fontSize="xl" textColor="gray.500" marginTop={3}>
              Easy - Quickly - Free
            </Text>

            <HStack marginTop={8}>
              <Button variant="solid" colorScheme="teal">
                Getting Start
              </Button>
              <Button variant="outline" colorScheme="teal" leftIcon={<h1>icon</h1>}>
                Download
              </Button>
            </HStack>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Home;
