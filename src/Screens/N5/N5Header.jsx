import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Center, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { changeTest } from "../../redux/actions";

function N5Header(props) {
  const { unitTitle, changeTest } = props;

  return (
    <HStack spacing={12} alignItems="start">
      <Center borderRadius="2xl" backgroundColor="teal.50" width={56} height={56}>
        <Heading size="4xl" fontWeight="bold" textColor="teal.500">
          N5
        </Heading>
      </Center>

      <VStack paddingY={4} alignItems="start">
        <Heading size="xl" fontWeight="bold" letterSpacing="tight" textColor="teal.700">
          JLPT N5 Test
        </Heading>
        <Text fontWeight="medium" textColor="gray.500" paddingTop={4}>
          Pick the test by unit in JLPT N5 course (from unit 1 to unit 25)
        </Text>
        <HStack spacing={4} paddingTop={4}>
          <Button variant="solid" colorScheme="teal" onClick={props.onContinueClick}>
            Want to learning
          </Button>
          {unitTitle && (
            <Button variant="outline" colorScheme="teal" onClick={() => changeTest("N5", null, null)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(N5Header);
