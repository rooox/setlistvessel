import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./shipp.svg";
import slogo from "./SV.svg";
import hamburger from "./hamburger.svg";

export default class Navbar extends Component {
  state = {
    displayMenu: false
  };

  async logout() {
    let res = await axios.get("/auth/logout");
    // this.props.history.push("./");
    console.log(res.data);
  }
  toggleMenu(e) {
    this.setState({ displayMenu: !this.state.displayMenu });
  }

  render() {
    return (
      <header>
        <div className="logo--container">
          <img src={slogo} className="slogo--nav" alt="Setlist Vessel" />
        </div>
        <div className="logo--container">
          <img src={logo} className="logo--nav" alt="Setlist Vessel" />
        </div>
        <div className="hamburger--container">
          <img
            src={hamburger}
            className="hamburger"
            onClick={e => this.toggleMenu(e.target.value)}
          />
        </div>
        <div className="links">
          <Link to="/home">
            <button>HOME</button>
          </Link>
          <Link to="/sets">
            <button>SETS</button>
          </Link>
          <Link to="/songs">
            <button>SONGS</button>
          </Link>
          <Link to="/about">
            <button>ABOUT</button>
          </Link>
          <Link to="/profile">
            <button>PROFILE</button>
          </Link>
          <Link to="/goodbye">
            <button className="logout--button" onClick={() => this.logout()}>
              Logout
            </button>
          </Link>
        </div>
      </header>
    );
  }
}
