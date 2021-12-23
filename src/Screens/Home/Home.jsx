import React, { Component } from "react";
import { Box, Container } from "@chakra-ui/react";

import QuickTest from "./QuickTest.jsx";
import UnitTest from "./UnitTest.jsx";
import HomeHeader from "./HomeHeader.jsx";

class Home extends Component {
  render() {
    return (
      <Box>
        <Container maxWidth="container.lg">
          <HomeHeader />

          <QuickTest />

          <UnitTest />
        </Container>
      </Box>
    );
  }
}

export default Home;
