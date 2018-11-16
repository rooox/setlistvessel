import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="background">
        <div className="sets_nav--container">
          <Link to="/sets" style={{ textDecoration: "none" }}>
            <h4 className="sets_nav">Sets</h4>
          </Link>
          <Link to="/songs" style={{ textDecoration: "none" }}>
            <h4 className="sets_nav">Songs</h4>
          </Link>
        </div>
      </div>
    );
  }
}
