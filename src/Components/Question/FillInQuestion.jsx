import React, { Component } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";

import "animate.css";

/**
 * @param {String} question
 * @param {String} answer
 * @param {Uint8Array} audio
 * @param {Uint8Array} image
 * @param {Boolean} isDoing
 * @param {Boolean} isTiming
 * @param {Boolean} isShowedAnswer
 * @param {Object} info checklist item
 * @param {String} guessAnswer
 * @param {Event} onChangeAnswer (guessAnswer, isCorrect) => {...}
 */
class FillInQuestion extends Component {
  state = {
    audioUrl: null,
    imageUrl: null,
    currentGuessAnswer: "",
  };

  trueAnswer = this.props.answer.content.toUpperCase();

  handleChangedAnswer = (event) => {
    const newAnswer = event.target.value;
    this.setState({ currentGuessAnswer: newAnswer });
    if (this.props.isTiming) this.changeAnswer(newAnswer);
  };

  changeAnswer = (newAnswer) => {
    const isTrueAnswer = newAnswer.toUpperCase() == this.trueAnswer;
    this.props.onChangeAnswer(newAnswer, isTrueAnswer);
  };

  componentDidMount() {
    // Convert audio and image data to blob: protocol
    if (this.props.audio) {
      const blobAudio = new Blob([this.props.audio], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blobAudio);

      this.setState({ audioUrl });
    }

    if (this.props.image) {
      const blobImage = new Blob([this.props.image], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blobImage);

      this.setState({ imageUrl });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentGuessAnswer != this.state.currentGuessAnswer) return true;
    if (nextProps.isDoing != this.props.isDoing) return true;
    if (nextProps.info != this.props.info) return true;
    if (nextState.audioUrl != this.state.audioUrl) return true;
    if (nextState.imageUrl != this.state.imageUrl) return true;

    return false;
  }

  componentDidUpdate() {
    // Clean after reset
    if (this.state.currentGuessAnswer != this.props.info.guessAnswer && !this.props.isDoing)
      this.setState({ currentGuessAnswer: this.props.info.guessAnswer });
  }

  render() {
    const { question, script, colorScheme, isDoing, isTiming } = this.props;
    const { isCorrect, isShowedAnswer } = this.props.info;

    const isShownScript = !isDoing && script;
    const isShownAnswerButton = !isTiming;

    let borderColor = "gray.100";
    let rightIcon = null;
    if (isShowedAnswer)
      if (isCorrect) {
        borderColor = "green.500";
        rightIcon = <CheckIcon color="green.500" />;
      } else {
        borderColor = "red.500";
        rightIcon = <SmallCloseIcon color="red.500" />;
      }

    return (
      <Box paddingBottom={8} className="animate__animated animate__fadeIn animate__slow">
        <Heading size="md" dangerouslySetInnerHTML={{ __html: question }} marginBottom={4}></Heading>

        <Box>
          {this.state.audioUrl && (
            <Box as="audio" src={this.state.audioUrl} controls width="100%" marginBottom={2} />
          )}

          {isShownScript && (
            <Accordion allowToggle marginBottom={2}>
              <AccordionItem>
                <AccordionButton _expanded={{ backgroundColor: `${colorScheme}.50` }}>
                  <Flex flexGrow={1}>
                    <Text fontWeight="medium" textColor="gray.500">
                      Chi tiết đoạn hội thoại
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  <Text dangerouslySetInnerHTML={{ __html: script }} fontWeight="medium" textColor="gray.500" />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}

          {this.state.imageUrl && <Image src={this.state.imageUrl} fit="fill" marginBottom={2} />}
        </Box>

        <InputGroup size="lg">
          <Input
            onChange={this.handleChangedAnswer}
            value={this.state.currentGuessAnswer}
            placeholder={`Câu trả lời gồm ${this.trueAnswer.length} kí tự`}
            focusBorderColor={`${colorScheme}.500`}
            borderColor={borderColor}
            isReadOnly={isShowedAnswer || !isDoing}
          />

          <InputRightElement width="auto">
            <Box paddingEnd={2}>
              {rightIcon}

              {isShownAnswerButton && (
                <Button
                  onClick={() => this.changeAnswer(this.state.currentGuessAnswer)}
                  isDisabled={isShowedAnswer || !isDoing}
                  size="sm"
                  marginStart={2}
                >
                  Trả lời
                </Button>
              )}
            </Box>
          </InputRightElement>
        </InputGroup>

        {isShowedAnswer && (
          <HStack spacing={2} marginTop={2}>
            <Text fontWeight="medium" textColor="gray.500">
              Câu trả lời:
            </Text>
            <Text fontWeight="medium" textColor="green.500">
              {this.trueAnswer}
            </Text>
          </HStack>
        )}
      </Box>
    );
  }
}

export default FillInQuestion;
