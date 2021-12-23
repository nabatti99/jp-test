import React, { Component } from "react";
import { Box, Container } from "@chakra-ui/react";

import N5Header from "./N5Header.jsx";
import N5Test from "./N5Tests/N5Tests.jsx";

class N5 extends Component {
  render() {
    return (
      <Box>
        <Container maxWidth="container.lg" marginTop={8}>
          <N5Header />

          <N5Test />
        </Container>
      </Box>
    );
  }
}

export default N5;
