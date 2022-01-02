import React, { Component } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import "animate.css";

/**
 * @param {String} content
 * @param {Boolean} isAdditionalInfo
 * @param {Uint8Array} audio
 * @param {Uint8Array} image
 */
class QuestionInfo extends Component {
  state = {
    audioUrl: null,
    imageUrl: null,
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

  render() {
    const { colorScheme, content, script, isDoing } = this.props;
    const isShownScript = !isDoing && script;

    return (
      <Box className="animate__animated animate__fadeIn">
        <Heading
          size="lg"
          dangerouslySetInnerHTML={{ __html: content }}
          marginTop={this.props.isAdditionalInfo ? 4 : 2}
          textColor="gray.900"
          marginBottom={4}
        ></Heading>

        <Box marginBottom={8}>
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
      </Box>
    );
  }
}

export default QuestionInfo;
