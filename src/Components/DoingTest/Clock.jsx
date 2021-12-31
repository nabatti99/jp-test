import React, { useEffect, useMemo, useState } from "react";
import { Alert, AlertIcon, AlertTitle, Button, Heading, Slide, VStack } from "@chakra-ui/react";

function Clock(props) {
  const addTimeMessageDictionary = ["Time Added 🪄", "Take your time!", "Good luck 🍀"];

  const getAddTimeMessage = () => {
    return addTimeMessageDictionary[Math.floor(Math.random() * addTimeMessageDictionary.length)];
  };

  const [addTimeMessage, setAddTimeMessage] = useState(getAddTimeMessage());
  const [isShownTimeMessage, setIsShownTimeMessage] = useState(false);

  const handleAddMoreTime = () => {
    setAddTimeMessage(getAddTimeMessage());
    setIsShownTimeMessage(true);

    props.onMoreTimeClick();
  };

  useEffect(() => {
    if (isShownTimeMessage) {
      const timeoutId = setTimeout(() => {
        setIsShownTimeMessage(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isShownTimeMessage]);

  const addTimeMessageRender = useMemo(() => {
    if (isShownTimeMessage)
      return (
        <Alert status="success" marginTop={4}>
          <AlertIcon />
          <AlertTitle marginRight={2}>{addTimeMessage}</AlertTitle>
        </Alert>
      );
  }, [addTimeMessage, isShownTimeMessage]);

  return (
    <Slide direction="right" in={props.isShown} style={{ top: 4, right: 2, width: "12rem", height: "12rem" }}>
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
        <Button
          variant="ghost"
          colorScheme="teal"
          isDisabled={!props.isEnabledAddMoreTime}
          onClick={handleAddMoreTime}
        >
          More Time
        </Button>
      </VStack>

      {addTimeMessageRender}
    </Slide>
  );
}

export default Clock;
