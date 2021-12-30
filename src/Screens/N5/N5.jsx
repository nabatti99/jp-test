import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container } from "@chakra-ui/react";

import N5Header from "./N5Header.jsx";
import Units from "../../Components/Categories/Units.jsx";
import Tests from "../../Components/Categories/Tests.jsx";
import DoingTest from "../../Components/DoingTest/DoingTest.jsx";

import { changeTest } from "../../redux/actions.js";
import Uploader from "../../Components/Uploader/Uploader.jsx";

function N5(props) {
  const { level, unitTitle, testTitle, changeTest } = props;
  const [isUploading, setIsUploading] = useState(false);

  const handleEndUploaded = () => {
    setIsUploading(false);
  };

  const handleBeginUploaded = () => {
    setIsUploading(true);
  };

  useEffect(() => {
    if (level != "N5") changeTest("N5", null, null);
  }, [level]);

  let contain = null;
  if (level == "N5")
    if (testTitle) contain = <DoingTest colorScheme="teal" />;
    else
      contain = (
        <Fragment>
          <N5Header />
          {unitTitle && <Tests colorScheme="teal" />}
          {!(unitTitle || testTitle) && <Units colorScheme="teal" />}
          <Uploader isOpen={isUploading} onBeginUpload={handleBeginUploaded} onEndUpload={handleEndUploaded} />
        </Fragment>
      );

  return (
    <Box onDragOver={handleBeginUploaded}>
      <Container maxWidth="container.lg" marginTop={8}>
        {contain}
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
