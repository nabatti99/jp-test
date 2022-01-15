import React from "react";
import { Center, Heading, Link, Text, VStack } from "@chakra-ui/react";

function HomeFooter(props) {
  return (
    <Center backgroundColor="gray.50" paddingY={8} marginTop={16}>
      <VStack>
        <Heading textColor="gray.300">JP Test</Heading>
        <Text fontWeight="medium" textColor="gray.300">
          Made with{" "}
          <Link href="https://www.electronjs.org/" isExternal={true} fontWeight="bold">
            ElectronJS
          </Link>
          {", "}
          <Link href="https://reactjs.org/" isExternal={true} fontWeight="bold">
            ReactJS
          </Link>
          {" and "}
          <Link href="https://chakra-ui.com/" isExternal={true} fontWeight="bold">
            ChakraUI
          </Link>
          .
        </Text>
      </VStack>
    </Center>
  );
}

export default HomeFooter;
