import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, HStack } from "@chakra-ui/react";

import { navigate } from "../../redux/actions";

class Navbar extends Component {
  screens = [
    {
      name: "Home",
      isAvailable: true,
    },
    {
      name: "N5",
      isAvailable: true,
    },
    {
      name: "N4",
      isAvailable: true,
    },
    {
      name: "N3",
      isAvailable: false,
    },
    {
      name: "N2",
      isAvailable: false,
    },
    {
      name: "N1",
      isAvailable: false,
    },
  ];

  render() {
    return (
      <Container maxWidth="container.lg">
        <HStack spacing={4} justify="center" marginTop={4}>
          {this.screens.map((screen) => (
            <Button
              key={screen.name}
              variant="ghost"
              colorScheme="teal"
              backgroundColor={this.props.screenName == screen.name ? "teal.50" : null}
              disabled={!screen.isAvailable}
              size="sm"
              onClick={() => this.props.navigate(screen.name)}
            >
              {screen.name}
            </Button>
          ))}
        </HStack>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  screenName: state.screenName,
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (screenName) => dispatch(navigate(screenName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
