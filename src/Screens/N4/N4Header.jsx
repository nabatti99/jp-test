import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Center, Container, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";

import { changeTest } from "../../redux/actions";

import "animate.css";

function N4Header(props) {
  const { unitTitle, changeTest } = props;

  return (
    <HStack spacing={12} alignItems="start">
      <Center
        borderRadius="2xl"
        backgroundColor="blue.50"
        width={56}
        height={56}
        className="animate__animated animate__rubberBand"
      >
        <Heading size="4xl" fontWeight="bold" textColor="blue.500">
          N4
        </Heading>
      </Center>

      <VStack paddingY={4} alignItems="start">
        <Heading
          size="xl"
          fontWeight="bold"
          letterSpacing="tight"
          textColor="blue.700"
          className="animate__animated animate__fadeInUp"
        >
          JLPT N4 Test
        </Heading>
        <Text
          fontWeight="medium"
          textColor="gray.500"
          paddingTop={4}
          className="animate__animated animate__fadeInUp animate__slow"
        >
          Pick a tests by unit in JLPT N4 course (from unit 25 to unit 50)
        </Text>
        <HStack spacing={4} paddingTop={4}>
          <Link
            href="https://drive.google.com/drive/folders/13Z6ZjbJ4tK3N4p7hI_Qaa53mOVBjocKx?usp=sharing"
            isExternal={true}
            textDecoration="none !important"
          >
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={null}
              className="animate__animated animate__fadeInUp animate__slow"
            >
              Want to learn
            </Button>
          </Link>
          {unitTitle && (
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => changeTest("N5", null, null)}
              className="animate__animated animate__fadeIn"
            >
              Back to Units
            </Button>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
}

const mapStateToProps = (state) => ({
  level: state.level,
  unitTitle: state.unit,
});

const mapDispatchToProps = (dispatch) => ({
  changeTest: (level, unit, test) => dispatch(changeTest(level, unit, test)),
});

export default connect(mapStateToProps, mapDispatchToProps)(N4Header);
