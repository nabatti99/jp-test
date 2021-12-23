import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar.jsx";
import Home from "../Screens/Home/Home.jsx";
import N5 from "../Screens/N5/N5.jsx";
import NotFoundPage from "../Screens/NotFoundPage/NotFoundPage.jsx";

class Layout extends Component {
  render() {
    return (
      <Router>
        <Box width="100%">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/N5" element={<N5 />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </Router>
    );
  }
}

export default Layout;
