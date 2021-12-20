import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Component } from "react";
import Layout from "./layout/Layout.jsx";

class App extends Component {
  render() {
    return (
      <ChakraProvider>
        <Layout />
      </ChakraProvider>
    );
  }
}

export default App;
