import React from "react";
import { connect } from "react-redux";
import { Button, Center, Heading, HStack, Text, VStack, Link } from "@chakra-ui/react";

import { changeTest } from "../../redux/actions";

function N3Header(props) {
  const { unitTitle, changeTest } = props;

  return (
    <HStack spacing={12} alignItems="start">
      <Center
        borderRadius="2xl"
        backgroundColor="pink.50"
        width={56}
        height={56}
        className="animate__animated animate__heartBeat"
      >
        <Heading size="4xl" fontWeight="bold" textColor="pink.500">
          N3
        </Heading>
      </Center>

      <VStack paddingY={4} alignItems="start">
        <Heading
          size="xl"
          fontWeight="bold"
          letterSpacing="tight"
          textColor="pink.700"
          className="animate__animated animate__fadeInUp"
        >
          JLPT N3 Test
        </Heading>
        <Text
          fontWeight="medium"
          textColor="gray.500"
          paddingTop={4}
          className="animate__animated animate__fadeInUp animate__slow"
        >
          Pick a tests by unit in JLPT N3 course
        </Text>
        <HStack spacing={4} paddingTop={4}>
          <Link
            href="https://drive.google.com/drive/folders/13Xo4PA06kzQUOLBv4RtEoc21TqfCK-nL?usp=sharing"
            isExternal={true}
            textDecoration="none !important"
          >
            <Button
              variant="solid"
              colorScheme="pink"
              onClick={null}
              className="animate__animated animate__fadeInUp animate__slow"
            >
              Want to learn
            </Button>
          </Link>
          {unitTitle && (
            <Button
              variant="outline"
              colorScheme="pink"
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

export default connect(mapStateToProps, mapDispatchToProps)(N3Header);
