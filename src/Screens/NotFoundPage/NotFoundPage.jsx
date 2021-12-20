import React, { Component } from "react";
import { Heading, VStack } from "@chakra-ui/react";

class NotFoundPage extends Component {
  render() {
    console.log(this.props);
    return (
      <VStack>
        <Heading>Sorry there is nothing here 😥</Heading>
      </VStack>
    );
  }
}

export default NotFoundPage;
