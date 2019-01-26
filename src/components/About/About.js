import React, { Component } from "react";
import "./about.css";

export default class About extends Component {
  render() {
    return (
      <div className="background">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "40px",
            textAlign: "center",
            borderRadius: "15px",

            padding: "44px",
            width: "749px",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }}
        >
          <h5>
            Setlist Vessel was created for the singing musician as a way to
            organize your songs information, including title, key, tuning,
            chords and lyrics, into categories or sets.
          </h5>
        </div>
      </div>
    );
  }
}
