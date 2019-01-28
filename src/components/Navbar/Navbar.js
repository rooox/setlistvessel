import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./shipp.svg";
import slogo from "./SV.svg";
import hamburger from "./hamburger.svg";
// import shipwheel from "./shipwheel.png";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  state = {
    displayMenu: false
  };

  async logoutdrop() {
    let res = await axios.get("/auth/logout");
    this.toggleMenu();
  }

  async logout() {
    let res = await axios.get("/auth/logout");
  }

  toggleMenu() {
    this.setState({ displayMenu: !this.state.displayMenu });
  }

  render() {
    return (
      <header>
        <div className="logo--container slogo">
          <img src={slogo} className="slogo--nav" alt="Setlist Vessel" />
        </div>
        <div className="logo--container">
          <img src={logo} className="logo--nav" alt="Setlist Vessel" />
        </div>
        <div
          className={
            this.props.history.location.pathname === "/"
              ? "none"
              : "hamburger--container"
          }
        >
          <img
            src={hamburger}
            className="hamburger"
            onClick={() => this.toggleMenu()}
          />
        </div>
        <div className="links">
          {/* <Link to="/home">
            <button>HOME</button>
          </Link> */}
          <Link to="/sets">
            <button>SETS</button>
          </Link>
          <Link to="/songs">
            <button>SONGS</button>
          </Link>
          {/* <Link to="/about">
            <button>ABOUT</button>
          </Link>
          <Link to="/profile">
            <button>PROFILE</button>
          </Link> */}
          {/* <Link to="/">
            <button>Login</button>
          </Link> */}
          <Link to="/goodbye">
            <button
              className={
                this.props.history.location.pathname === "/"
                  ? "none"
                  : "logout--button"
              }
              onClick={() => this.logout()}
            >
              Logout
            </button>
          </Link>
          {/* <img
            className={
              this.props.history.location.pathname === "/"
                ? "none"
                : "shipwheel"
            }
            src={shipwheel}
          /> */}
        </div>
        <div
          className={
            this.state.displayMenu
              ? "dropdown-menu-open"
              : "dropdown-menu-closed"
          }
        >
          <div>
            <Link to="/home">
              <h4 className="ham-item" onClick={() => this.toggleMenu()}>
                Home
              </h4>
            </Link>
            <Link to="/sets">
              <h4 className="ham-item" onClick={() => this.toggleMenu()}>
                Sets
              </h4>
            </Link>
            <Link to="/songs">
              <h4 className="ham-item" onClick={() => this.toggleMenu()}>
                Songs
              </h4>
            </Link>
            <Link to="/about">
              <h4 className="ham-item" onClick={() => this.toggleMenu()}>
                About
              </h4>
            </Link>
            <Link to="/profile">
              <h4 className="ham-item" onClick={() => this.toggleMenu()}>
                Profile
              </h4>
            </Link>
            {/* <Link to="/">
            <h4 className={
                  this.state.displayMenu
                    ? "dropdown-items-open"
                    : "dropdown-items-closed"
                } onClick={() => this.toggleMenu()}>
              LOGIN
            </h4>
          </Link> */}
            <Link to="/goodbye">
              <h4
                // style={
                //   this.props.history.location.pathname
                //     ? { display: "none" }
                //     : {}
                // }
                className="ham-item"
                onClick={() => this.toggleMenu()}
                onClick={() => this.logoutdrop()}
              >
                Logout
              </h4>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Navbar);
