import React, { Component, Fragment } from "react";
import { useParams, mat } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";

import N5Header from "./N5Header.jsx";
import N5Units from "./N5Categories/N5Units.jsx";
import N5Tests from "./N5Categories/N5Tests.jsx";
import N5DoingTest from "./N5DoingTest/N5DoingTest.jsx";

function N5() {
  const { unitTitle, testTitle } = useParams();

  let render = null;
  if (testTitle) render = <N5DoingTest />;
  else
    render = (
      <Fragment>
        <N5Header />
        {unitTitle && <N5Tests unitTitle={unitTitle} />}
        {!(unitTitle || testTitle) && <N5Units />}
      </Fragment>
    );

  return (
    <Box>
      <Container maxWidth="container.lg" marginTop={8}>
        {render}
      </Container>
    </Box>
  );
}

export default N5;
