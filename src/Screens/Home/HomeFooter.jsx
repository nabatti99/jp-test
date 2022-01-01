import React from "react";
import { Center, Heading, Link, Text, VStack } from "@chakra-ui/react";

function HomeFooter(props) {
  return (
    <Center backgroundColor="gray.50" paddingY={8} marginTop={16}>
      <VStack>
        <Heading textColor="gray.300">JP Test</Heading>
        <Text fontWeight="medium" textColor="gray.300">
          Made by{" "}
          <Link href="https://www.facebook.com/HUGOClub" target="_blank">
            Hugo English Club
          </Link>{" "}
          team with love.
        </Text>
      </VStack>
    </Center>
  );
}

export default HomeFooter;
