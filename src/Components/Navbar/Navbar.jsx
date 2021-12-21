import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, HStack, Link } from "@chakra-ui/react";

class Navbar extends Component {
  addresses = {
    Home: {
      path: "/",
      isAvailable: true,
    },
    N5: {
      path: "/N5",
      isAvailable: true,
    },
    N4: {
      path: "/N4",
      isAvailable: true,
    },
    N3: {
      path: "/N3",
      isAvailable: false,
    },
    N2: {
      path: "/N2",
      isAvailable: false,
    },
    N1: {
      path: "/N1",
      isAvailable: false,
    },
  };

  render() {
    return (
      <Container maxWidth="container.lg">
        <HStack spacing={4} justify="center" marginTop={4}>
          {Object.keys(this.addresses).map((addressKey) => (
            <NavLink to={this.addresses[addressKey].path} key={addressKey}>
              {({ isActive }) => (
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  backgroundColor={isActive ? "teal.50" : null}
                  disabled={!this.addresses[addressKey].isAvailable}
                  size="sm"
                >
                  {addressKey}
                </Button>
              )}
            </NavLink>
          ))}
        </HStack>
      </Container>
    );
  }
}

export default Navbar;
