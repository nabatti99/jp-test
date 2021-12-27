import React from "react";
import { Button, Heading, Slide, VStack } from "@chakra-ui/react";

function N5Clock(props) {
  return (
    <Slide direction="right" in={props.isShowed} style={{ top: 4, right: 2, width: "12rem", height: "12rem" }}>
      <VStack
        alignItems="stretch"
        backgroundColor="white"
        opacity={0.4}
        paddingY={2}
        paddingX={4}
        shadow="md"
        borderRadius="md"
        transition="0.24s"
        _hover={{ opacity: 1 }}
      >
        <Heading color="gray.900" size="lg" paddingY={2} textAlign="center">
          {props.timeDisplay}
        </Heading>
        <Button variant="solid" colorScheme="red" onClick={props.onEndTimeClick}>
          End &amp; Submit
        </Button>
        <Button variant="ghost" colorScheme="teal" isDisabled={true}>
          More Time
        </Button>
      </VStack>
    </Slide>
  );
}

export default N5Clock;
