import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import "../reset.css";
import logo from "./SVL.svg";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      registrationMode: true
    };
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }
  updatePassword(e) {
    this.setState({ password: e.target.value });
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
    console.log(res);
    if (res.data.message === "loggedIn") {
      this.props.history.push("/home");
    } else {
      alert(res.data.message);
    }
  }
  async signup() {
    if (!this.state.email || !this.state.password)
      return alert("Please fill out email and password");
    //fix url
    let res = await axios.post("/auth/register", {
      email: this.state.email,
      password: this.state.password
    });
    console.log(res);
    if (res.data.message === "loggedIn") {
      this.props.history.push("/home");
    } else {
      alert(res.data.message);
    }
  }
  async logout() {
    let res = await axios.get("/auth/logout");
    // this.props.history.push("./");
    console.log(res.data);
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
            <button onClick={() => this.login()}>LOGIN</button>
            <button onClick={() => this.regToggle()}>SIGNUP</button>
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
              Username:{" "}
              <input onChange={e => this.updatePassword(e)} type="text" />
            </p>
            <p>
              Email:{" "}
              <input onChange={e => this.updatePassword(e)} type="email" />
            </p>
            <p>
              Password:{" "}
              <input onChange={e => this.updatePassword(e)} type="password" />
            </p>
            <p>
              First name:{" "}
              <input onChange={e => this.updatePassword(e)} type="text" />
            </p>
            <p>
              Last name:{" "}
              <input onChange={e => this.updatePassword(e)} type="text" />
            </p>
            <p>
              Phone:{" "}
              <input onChange={e => this.updatePassword(e)} type="text" />
            </p>
          </div>
          <div className="buttons">
            <button onClick={() => this.regToggle()}>CANCEL</button>
            <button onClick={() => this.signup()}>SIGNUP</button>
          </div>
        </div>
      </div>
    );
  }
}
