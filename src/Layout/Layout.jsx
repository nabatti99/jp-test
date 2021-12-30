import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "../Components/Navbar/Navbar.jsx";
import Home from "../Screens/Home/Home.jsx";
import NotFoundPage from "../Screens/NotFoundPage/NotFoundPage.jsx";
import N5 from "../Screens/N5/N5.jsx";
import N4 from "../Screens/N4/N4.jsx";
import N3 from "../Screens/N3/N3.jsx";

import "./Layout.css";

class Layout extends Component {
  render() {
    let screen = <NotFoundPage />;
    switch (this.props.screenName) {
      case "Home":
        screen = <Home />;
        break;
      case "N5":
        screen = <N5 />;
        break;
      case "N4":
        screen = <N4 />;
        break;
      case "N3":
        screen = <N3 />;
        break;
    }

    return (
      <Box width="100%">
        <Navbar />

        {screen}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  screenName: state.screenName,
});

export default connect(mapStateToProps)(Layout);
