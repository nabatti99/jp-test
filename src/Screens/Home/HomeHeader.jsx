import React, { Component } from "react";
import { Box, Button, Heading, HStack, Text, Container, Image } from "@chakra-ui/react";
import { ArrowForwardIcon, DownloadIcon } from "@chakra-ui/icons";

import SquarePIcon from "../../Components/Icons/SquarePIcon.jsx";
import SquareJIcon from "../../Components/Icons/SquareJIcon.jsx";

import "animate.css";
import GraduationSVG from "../../global/svgs/Graduation.svg";

class HomeHeader extends Component {
  handleStartedButtonClicked = () => {
    window.scrollTo({ top: document.body.clientHeight - window.innerHeight, behavior: "smooth" });
  };

  render() {
    return (
      <Box marginTop={8} position="relative">
        <Container maxWidth="container.lg">
          <Text
            fontWeight="medium"
            fontSize="2xl"
            textColor="gray.500"
            className="animate__animated animate__fadeInUp"
          >
            Practice your self with
          </Text>
          <HStack alignItems="end">
            <SquareJIcon boxSize={16} color="teal.400" className="animate__animated animate__fadeInUp" />
            <SquarePIcon boxSize={16} color="teal.400" className="animate__animated animate__fadeInUp" />
            <Heading
              as="h1"
              size="4xl"
              textColor="teal.400"
              letterSpacing="tighter"
              paddingStart={1}
              className="animate__animated animate__fadeInUp animate__slow"
            >
              Test
            </Heading>
          </HStack>
          <Text
            fontWeight="medium"
            fontSize="3xl"
            textColor="gray.500"
            marginTop={4}
            className="animate__animated animate__fadeInUp animate__slow"
          >
            Easy - Quick - Free
          </Text>

          <HStack marginTop={8}>
            <Button
              variant="solid"
              colorScheme="teal"
              onClick={this.handleStartedButtonClicked}
              rightIcon={<ArrowForwardIcon />}
              className="animate__animated animate__fadeInUp"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              rightIcon={<DownloadIcon />}
              className="animate__animated animate__fadeInUp animate__slow"
            >
              More tests
            </Button>
          </HStack>
        </Container>

        <Box
          position="absolute"
          bottom={0}
          right={0}
          className="animate__animated animate__fadeInUp animate__slower"
        >
          <Image src={GraduationSVG} height={48} />
        </Box>
      </Box>
    );
  }
}

export default HomeHeader;
