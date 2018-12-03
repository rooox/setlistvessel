import React from "react";
import "./goodbye.css";

export default function Goodbye() {
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

        <h4 className="loggedout-quote">
          “Without music, life would be a mistake” ― Friedrich Nietzsche.
        </h4>
      </div>
    </div>
  );
}
