import React, { Component } from "react";
import { Box, Container } from "@chakra-ui/react";

import QuickTest from "./QuickTest.jsx";
import UnitTest from "./UnitTest.jsx";
import HomeHeader from "./HomeHeader.jsx";
import HomeFooter from "./HomeFooter.jsx";

class Home extends Component {
  render() {
    return (
      <Box>
        <HomeHeader />

        <QuickTest />
        <UnitTest />

        <HomeFooter />
      </Box>
    );
  }
}

export default Home;
