import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ConfigureURLAndKeywords from "../ConfigureURLAndKeywords/ConfigureURLAndKeywords";

function NavbarComponent() {
  return (
    <>
      <Router>
        <nav className="d-flex justify-content-between align-items-center navbarBackGroundColour">
          <div className="textColourWhite m-3">NEWS Feed Extractor</div>
          <ul className="d-flex m-3">
            <li className="me-3">
              <Link to="/" className="text-decoration-none textColourWhite">
                Configure URL & Keywords
              </Link>
            </li>
            <li className="me-3">
              <Link to="/logs" className="text-decoration-none textColourWhite">
                Logs
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ConfigureURLAndKeywords />} />
        </Routes>
      </Router>
    </>
  );
}

export default NavbarComponent;
