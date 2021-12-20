import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar.jsx";
import Home from "../Screens/Home/Home.jsx";
import NotFoundPage from "../Screens/NotFoundPage/NotFoundPage.jsx";

class Layout extends Component {
  render() {
    return (
      <Router>
        <Box width="100%" height="24rem" bgGradient="linear(to-b, teal.100, white)" paddingY={2}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </Router>
    );
  }
}

export default Layout;
