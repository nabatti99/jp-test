import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, HStack, Link } from "@chakra-ui/react";

class Navbar extends Component {
  addresses = {
    Home: "/",
    N5: "/N5",
    N4: "/N4",
  };

  render() {
    return (
      <Container maxWidth="container.lg">
        <HStack spacing={4} justify="center">
          {Object.keys(this.addresses).map((addressKey) => (
            <NavLink to={this.addresses[addressKey]} key={addressKey}>
              {({ isActive }) => (
                <Button variant="ghost" colorScheme="teal" backgroundColor={isActive && "teal.50"}>
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
