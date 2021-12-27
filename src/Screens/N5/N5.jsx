import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Container } from "@chakra-ui/react";

import N5Header from "./N5Header.jsx";
import N5Units from "./N5Categories/N5Units.jsx";
import N5Tests from "./N5Categories/N5Tests.jsx";
import N5DoingTest from "./N5DoingTest/N5DoingTest.jsx";

import { changeTest } from "../../redux/actions.js";

function N5(props) {
  const { level, unitTitle, testTitle, changeTest } = props;

  useEffect(() => {
    if (level != "N5") changeTest("N5", null, null);
  }, [level]);

  let render = null;
  if (level == "N5")
    if (testTitle) render = <N5DoingTest />;
    else
      render = (
        <Fragment>
          <N5Header />
          {unitTitle && <N5Tests />}
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

const mapStateToProps = (state) => ({
  level: state.level,
  unitTitle: state.unit,
  testTitle: state.test,
});

const mapDispatchToProps = (dispatch) => ({
  changeTest: (level, unit, test) => dispatch(changeTest(level, unit, test)),
});

export default connect(mapStateToProps, mapDispatchToProps)(N5);
