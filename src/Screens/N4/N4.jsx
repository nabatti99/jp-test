import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container } from "@chakra-ui/react";

import N4Header from "./N4Header.jsx";
import Units from "../../Components/Units/Units.jsx";
import Tests from "../../Components/Tests/Tests.jsx";
import DoingTest from "../../Components/DoingTest/DoingTest.jsx";

import { changeTest } from "../../redux/actions.js";

function N4(props) {
  const { level, section, unit, test, changeTest } = props;

  useEffect(() => {
    if (level != "N4") changeTest("N4", null, null, null);
  }, [level]);

  let contain = null;
  if (level == "N4")
    if (section && unit && test)
      // Render Doing test if have enough Section, Unit and Test
      contain = <DoingTest colorScheme="blue" />;
    else
      contain = (
        <Fragment>
          <N4Header />
          {section && unit ? (
            <Tests colorScheme="blue" />
          ) : (
            <Fragment>
              <Units colorScheme="blue" section="Mina no Nihongo 25 - 50" />
              <Units colorScheme="blue" section="External Sources" />
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

export default connect(mapStateToProps, mapDispatchToProps)(N4);
