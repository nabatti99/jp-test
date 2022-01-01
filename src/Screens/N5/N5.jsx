import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container } from "@chakra-ui/react";

import N5Header from "./N5Header.jsx";
import Units from "../../Components/Units/Units.jsx";
import Tests from "../../Components/Tests/Tests.jsx";
import DoingTest from "../../Components/DoingTest/DoingTest.jsx";

import { changeTest } from "../../redux/actions.js";

function N5(props) {
  const { level, section, unit, test, changeTest } = props;

  useEffect(() => {
    if (level != "N5") changeTest("N5", null, null, null);
  }, [level]);

  let contain = null;
  if (level == "N5")
    if (section && unit && test)
      // Render Doing test if have enough Section, Unit and Test
      contain = <DoingTest colorScheme="teal" />;
    else
      contain = (
        <Fragment>
          <N5Header />
          {section && unit ? (
            <Tests colorScheme="teal" />
          ) : (
            <Fragment>
              <Units colorScheme="teal" section="Mina no Nihongo 1 - 25" />
              <Units colorScheme="teal" section="External Sources" />
            </Fragment>
          )}
        </Fragment>
      );

  return (
    <Box>
      <Container maxWidth="container.lg" marginTop={8}>
        {contain}
        <Box height={16}></Box>
      </Container>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  level: state.level,
  section: state.section,
  unit: state.unit,
  test: state.test,
});

const mapDispatchToProps = (dispatch) => ({
  changeTest: (level, section, unit, test) => dispatch(changeTest(level, section, unit, test)),
});

export default connect(mapStateToProps, mapDispatchToProps)(N5);
