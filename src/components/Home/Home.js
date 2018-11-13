import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="background">
        <h4>Home</h4>
        <Link to="/sets">
          <h4>Sets</h4>
        </Link>
        <Link to="/songs">
          <h4>Songs</h4>
        </Link>
      </div>
    );
  }
}
