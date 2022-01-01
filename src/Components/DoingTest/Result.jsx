import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

function Result(props) {
  const { isShown, numTrueAnswers, numQuestions } = props.info;

  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: isShown,
  });

  const { level, section, unit, test } = props;
  const [text, setText] = useState("Saving your result...");

  useMemo(() => {
    if (isShown) {
      window.nativeAPI
        .readSummary(level, section, unit, test)
        .then((summary) => {
          summary.history = {
            numTrueAnswers,
            numQuestions,
            time: new Date(),
          };
          return window.nativeAPI.saveJSON("summary", summary, level, section, unit, test);
        })
        .then(() => setText("Your result has been saved!"))
        .catch((error) => {
          console.error(error);
          setText("Fail to save your result 😥");
        });
    }
  }, [isShown]);

  const handleClosedModal = () => {
    onClose();
    props.onClose();
  };

  const messageDictionary = {
    excellent: ["Excellent!", "Perfect!", "So Amazing 🤯", "Big Result 😎"],
    good: ["Good!", "Well done 🥰", "That so cool 😍"],
    ok: ["That's OK 👍", "Not bad!", "Passed 😜"],
    tryMore: ["Try more 😇", "Relax and try again!", "One more time..."],
  };

  let colorScheme = null;
  let message = null;
  if (numTrueAnswers / numQuestions > 0.85) {
    message = messageDictionary.excellent[Math.floor(Math.random() * messageDictionary.excellent.length)];
    colorScheme = "green";
  } else if (numTrueAnswers / numQuestions > 0.7) {
    message = messageDictionary.good[Math.floor(Math.random() * messageDictionary.good.length)];
    colorScheme = "teal";
  } else if (numTrueAnswers / numQuestions > 0.5) {
    message = messageDictionary.ok[Math.floor(Math.random() * messageDictionary.ok.length)];
    colorScheme = "orange";
  } else {
    message = messageDictionary.tryMore[Math.floor(Math.random() * messageDictionary.tryMore.length)];
    colorScheme = "red";
  }

  return (
    <Modal colorScheme="teal" isCentered isOpen={isOpen} onClose={handleClosedModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Result</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <HStack alignItems="end">
              <Heading as="h1" size="4xl" letterSpacing="tight" textColor={`${colorScheme}.700`}>
                {numTrueAnswers < 10 ? `0${numTrueAnswers}` : numTrueAnswers}
              </Heading>
              <Text size="lg" fontWeight="bold" textColor={`${colorScheme}.500`}>
                /{numQuestions}
              </Text>
            </HStack>
            <Heading as="h2" size="lg" textColor={`${colorScheme}.500`}>
              {message}
            </Heading>
            <Text fontWeight="bold" textColor="gray.500">
              {text}
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={handleClosedModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  level: state.level,
  section: state.section,
  unit: state.unit,
  test: state.test,
});

export default connect(mapStateToProps)(Result);
