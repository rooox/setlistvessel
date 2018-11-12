import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <h5>Navbar</h5>
        <Link to="/">
          <h4>Home</h4>
        </Link>
        <Link to="/sets">
          <h4>Sets</h4>
        </Link>
        <Link to="/songs">
          <h4>Songs</h4>
        </Link>
        <Link to="/about">
          <h4>About</h4>
        </Link>
        <Link to="/profile">
          <h4>Profile</h4>
        </Link>
      </div>
    );
  }
}
