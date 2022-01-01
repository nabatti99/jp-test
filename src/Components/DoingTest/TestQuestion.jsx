import React, { Component } from "react";
import { Box, Heading, Image, Radio, RadioGroup, SimpleGrid, Text } from "@chakra-ui/react";

import "animate.css";

/**
 * @param {String} question
 * @param {Array} answers
 * @param {String} audio
 * @param {String} image
 * @param {Boolean} isDoing
 * @param {Object} info checklist item
 * @param {Event} onChangeAnswer (isCorrect) => {...}
 */
class TestQuestion extends Component {
  state = {
    audioUrl: null,
    imageUrl: null,
  };

  correctAnswer = this.props.answers.find((answer) => answer.isCorrect).content;

  handleChangedAnswer = (guessAnswer) => {
    const isCorrect = guessAnswer == this.correctAnswer;
    this.props.onChangeAnswer(guessAnswer, isCorrect);
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
    if (nextProps.isDoing != this.props.isDoing) return true;
    if (nextProps.info != this.props.info) return true;
    if (nextState.audioUrl != this.state.audioUrl) return true;
    if (nextState.imageUrl != this.state.imageUrl) return true;

    return false;
  }

  render() {
    const { question, answers, colorScheme, isDoing } = this.props;
    const { guessAnswer, isCorrect, isShowedAnswer } = this.props.info;

    return (
      <Box paddingBottom={8} className="animate__animated animate__fadeIn animate__slow">
        <Heading size="md" dangerouslySetInnerHTML={{ __html: question }} marginBottom={4}></Heading>

        <Box>
          {this.state.audioUrl && (
            <Box as="audio" src={this.state.audioUrl} controls width="100%" marginBottom={2} />
          )}
          {this.state.imageUrl && <Image src={this.state.imageUrl} fit="fill" marginBottom={2} />}
        </Box>

        <RadioGroup onChange={this.handleChangedAnswer} value={guessAnswer}>
          <SimpleGrid columns={answers.length % 2 == 0 ? 2 : 3} gap={2}>
            {answers.map((answer) => {
              const isCorrectAnswer = this.correctAnswer == answer.content;
              const isGuessAnswer = guessAnswer == answer.content;

              let borderColor = "gray.100";
              let backgroundColor = null;
              if (isShowedAnswer) {
                if (isCorrectAnswer) {
                  borderColor = "green.500";
                  backgroundColor = "green.100";
                } else if (isGuessAnswer) {
                  borderColor = "red.500";
                  backgroundColor = "red.100";
                }
              } else if (isGuessAnswer) {
                borderColor = `${colorScheme}.500`;
                backgroundColor = `${colorScheme}.50`;
              }

              return (
                <Box
                  key={answer.ID}
                  paddingX={4}
                  paddingY={2}
                  borderRadius="lg"
                  borderWidth={1}
                  backgroundColor={backgroundColor}
                  borderColor={borderColor}
                >
                  <Radio
                    value={answer.content}
                    colorScheme={isShowedAnswer ? (isCorrect ? "green" : "red") : `${colorScheme}`}
                    isReadOnly={isShowedAnswer || !isDoing}
                    borderColor={borderColor}
                    width="100%"
                  >
                    <Text textColor="gray.900" dangerouslySetInnerHTML={{ __html: answer.content }}></Text>
                  </Radio>
                </Box>
              );
            })}
          </SimpleGrid>
        </RadioGroup>
      </Box>
    );
  }
}

export default TestQuestion;
