// import React from "react";
import React, { Component } from "react";
import "./goodbye.css";
import axios from "axios";

export default class Goodbye extends Component {
  // state = {
  //   quote: "",
  //   author: ""
  // };

  // componentDidMount() {
  //   this.pullQuote();
  // }
  // pullQuote() {
  //   axios
  //     .get("https://favqs.com/api/qotd")

  //     .then(res => {
  //       const { body, author } = res.data.quote;

  //       this.setState({ quote: body, author: author });
  //     });
  // }

  render() {
    return (
      <div className="background">
        <div
          className="goodbyewords"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "40px",
            textAlign: "center"
          }}
        >
          <h1 className="loggedout">You are logged out.</h1>
          <div style={{ display: "flex" }}>
            <h1 className="loggedout-thanks"> Thanks for visiting</h1>
            <h1 className="loggedout-sv"> Setlist Vessel!</h1>
          </div>
          <br />
          <br />
          {/* <h2 className="loggedout-quote">
            "{this.state.quote}" - {this.state.author}
          </h2> */}

          <h4 className="loggedout-quote">
            “Without music, life would be a mistake” ― Friedrich Nietzsche.
          </h4>
        </div>
      </div>
    );
  }
}
