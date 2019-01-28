import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import "../reset.css";
import logo from "./YSL.svg";
// import logo from "../Navbar/shipp.svg";
import { updateUser } from "./../../dux/reducer";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      registrationMode: true
    };
  }

  updateUsername(e) {
    this.setState({ username: e.target.value });
  }
  updateEmail(e) {
    this.setState({ email: e.target.value });
  }
  updatePassword(e) {
    this.setState({ password: e.target.value });
  }
  updateFirstname(e) {
    this.setState({ firstname: e.target.value });
  }
  updateLastname(e) {
    this.setState({ lastname: e.target.value });
  }
  updatePhone(e) {
    this.setState({ phone: e.target.value });
  }

  regToggle(e) {
    this.setState({ registrationMode: !this.state.registrationMode });
  }

  async login() {
    if (!this.state.email || !this.state.password)
      return alert("Please fill out email and password");
    let res = await axios.post("/auth/login", {
      email: this.state.email,
      password: this.state.password
    });
    if (res.data.message === "Logged in") {
      this.props.updateUser(res.data.user);
      this.props.history.push("/home");
    }
    // else {
    //   alert(res.data.message);
    // }
  }

  async signup() {
    if (
      !this.state.email ||
      !this.state.password ||
      !this.state.username ||
      !this.state.firstname
    )
      return alert("Please fill out all required information");
    //fix url
    let res = await axios.post("/auth/register", {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone
    });
    if (res.data.message === "Logged in") {
      this.props.history.push("/home");
    } else {
      alert(res.data.message);
    }
  }
  async logout() {
    let res = await axios.get("/auth/logout");
  }

  render() {
    return this.state.registrationMode ? (
      <div className="background">
        <div className="login--container">
          <h2 className="login--welcome">Welcome to</h2>
          <img src={logo} className="login--logo" alt="Setlist Vessel" />
          <p>
            Email: <input onChange={e => this.updateEmail(e)} type="email" />
          </p>
          <p>
            Password:{" "}
            <input onChange={e => this.updatePassword(e)} type="password" />
          </p>
          <div className="login--buttons">
            <button className="login-button" onClick={() => this.login()}>
              LOGIN
            </button>
            <button className="login-button" onClick={() => this.regToggle()}>
              SIGNUP
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="background">
        <div className="register--container">
          <h2 className="welcome">Welcome to</h2>
          <img src={logo} className="logo" alt="Setlist Vessel" />
          {/* <h2 className="subwelcome">
            Please fill out the below to get started{" "}
          </h2> */}
          <div className="inputs">
            <p>
              Username*:{" "}
              <input
                onChange={e => this.updateUsername(e)}
                type="text"
                // placeholder="type here..."
              />
            </p>
            <p>
              Email*:{" "}
              <input
                onChange={e => this.updateEmail(e)}
                type="email"
                // placeholder="type here..."
              />
            </p>
            <p>
              Password*:{" "}
              <input
                onChange={e => this.updatePassword(e)}
                type="password"
                // placeholder="type here..."
              />
            </p>
            <p>
              First name*:{" "}
              <input
                onChange={e => this.updateFirstname(e)}
                type="text"
                // placeholder="type here..."
              />
            </p>
            <p>
              Last name:{" "}
              <input
                onChange={e => this.updateLastname(e)}
                type="text"
                // placeholder="type here..."
              />
            </p>
            <p>
              Phone:{" "}
              <input
                onChange={e => this.updatePhone(e)}
                type="text"
                // placeholder="type here..."
              />
            </p>
          </div>
          <div className="register-buttons">
            <button className="login-button" onClick={() => this.regToggle()}>
              CANCEL
            </button>
            <button className="login-button" onClick={() => this.signup()}>
              SIGNUP
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(Login);
