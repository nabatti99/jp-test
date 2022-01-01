import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Center, Heading, Image, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import HeartBrokenIcon from "../../Components/Icons/HeartBrokenIcon.jsx";
import NotFoundSvg from "../../global/svgs/NotFound.svg";

import { navigate } from "../../redux/actions.js";

class NotFoundPage extends Component {
  render() {
    return (
      <Center height="90vh">
        <VStack spacing={4} position="relative">
          <HeartBrokenIcon color="red.400" boxSize={16} />
          <Heading textColor="red.500" letterSpacing="tight">
            Sorry there is nothing here 😥
          </Heading>
          <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={() => this.props.navigate("Home")}>
            Back to Home
          </Button>

          <Center paddingTop={16}>
            <Image src={NotFoundSvg} width={96} />
          </Center>
        </VStack>
      </Center>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (screenName) => dispatch(navigate(screenName)),
});

export default connect(null, mapDispatchToProps)(NotFoundPage);
