import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  Heading,
  Slide,
  VStack,
} from "@chakra-ui/react";

function Clock(props) {
  const addTimeMessageDictionary = ["Time Added 🪄", "Take your time!", "Good luck 🍀"];

  const getAddTimeMessage = () => {
    return addTimeMessageDictionary[Math.floor(Math.random() * addTimeMessageDictionary.length)];
  };

  const [addTimeMessage, setAddTimeMessage] = useState(getAddTimeMessage());
  const [isShowTimeMessage, setIsShowTimeMessage] = useState(false);

  const handleAddMoreTime = () => {
    setAddTimeMessage(getAddTimeMessage());
    setIsShowTimeMessage(true);

    props.onMoreTimeClick();
  };

  useEffect(() => {
    if (isShowTimeMessage) {
      const timeoutId = setTimeout(() => {
        setIsShowTimeMessage(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isShowTimeMessage]);

  const addTimeMessageRender = useMemo(() => {
    if (isShowTimeMessage)
      return (
        <Alert status="success" marginTop={4}>
          <AlertIcon />
          <AlertTitle marginRight={2}>{addTimeMessage}</AlertTitle>
        </Alert>
      );
  }, [addTimeMessage, isShowTimeMessage]);

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
