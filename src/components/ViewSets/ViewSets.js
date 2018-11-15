import React, { Component } from "react";
import "./viewsets.css";
import axios from "axios";
// import editPencil from "./editpencil.svg";

export default class ViewSets extends Component {
  constructor() {
    super();

    this.state = {
      sets: []
    };
  }
  componentDidMount() {
    axios.get("/api/sets").then(res => {
      this.setState({
        sets: res.data
      });
      console.log("in component did mount", this.state.sets);
    });
  }

  render() {
    console.log("in render:", this.state.sets);
    let displaySets = this.state.sets.map(set => {
      return (
        <div className="set" key={set.id}>
          <h5>{set.title}</h5>
          {/* <img src={editPencil} className="editpencil" alt="edit" /> */}
        </div>
      );
    });
    return (
      <div className="background">
        <div className="viewsets">
          <h4 className="yoursets">Your Sets</h4>
          <div className="set--container" />
          <div>{displaySets}</div>
        </div>
      </div>
    );
  }
}
