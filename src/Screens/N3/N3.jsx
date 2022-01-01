import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container } from "@chakra-ui/react";

import N3Header from "./N3Header.jsx";
import Units from "../../Components/Units/Units.jsx";
import Tests from "../../Components/Tests/Tests.jsx";
import DoingTest from "../../Components/DoingTest/DoingTest.jsx";

import { changeTest } from "../../redux/actions.js";

function N3(props) {
  const { level, section, unit, test, changeTest } = props;

  useEffect(() => {
    if (level != "N3") changeTest("N3", null, null, null);
  }, [level]);

  let contain = null;
  if (level == "N3")
    if (section && unit && test)
      // Render Doing test if have enough Section, Unit and Test
      contain = <DoingTest colorScheme="pink" />;
    else
      contain = (
        <Fragment>
          <N3Header />
          {section && unit ? (
            <Tests colorScheme="pink" />
          ) : (
            <Fragment>
              <Units colorScheme="pink" section="Junbi" />
              <Units colorScheme="pink" section="Tkaitasu" />
              <Units colorScheme="pink" section="External Sources" />
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

export default connect(mapStateToProps, mapDispatchToProps)(N3);
