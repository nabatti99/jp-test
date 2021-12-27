import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Component } from "react";
import { Provider } from "react-redux";

import Layout from "./layout/Layout.jsx";
import store from "./redux/store.js";

class App extends Component {
  render() {
    return (
      <ChakraProvider>
        <Provider store={store}>
          <Layout />
        </Provider>
      </ChakraProvider>
    );
  }
}

export default App;
