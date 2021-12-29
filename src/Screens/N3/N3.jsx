import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container } from "@chakra-ui/react";

import N3Header from "./N3Header.jsx";
import Units from "../../Components/Categories/Units.jsx";
import Tests from "../../Components/Categories/Tests.jsx";
import DoingTest from "../../Components/DoingTest/DoingTest.jsx";

import { changeTest } from "../../redux/actions.js";
import Uploader from "../../Components/Uploader/Uploader.jsx";

function N3(props) {
  const { level, unitTitle, testTitle, changeTest } = props;
  const [isUploading, setIsUploading] = useState(false);

  const handleEndUploaded = () => {
    setIsUploading(false);
  };

  const handleBeginUploaded = () => {
    setIsUploading(true);
  };

  useEffect(() => {
    if (level != "N3") changeTest("N3", null, null);
  }, [level]);

  let contain = null;
  if (level == "N3")
    if (testTitle) contain = <DoingTest colorScheme="green" />;
    else
      contain = (
        <Fragment>
          <N3Header />
          {unitTitle && <Tests colorScheme="green" />}
          {!(unitTitle || testTitle) && <Units colorScheme="green" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(N3);
