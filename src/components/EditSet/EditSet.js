import React, { Component } from "react";
import "../ViewSet/viewset.css";

export default class ViewSet extends Component {
  state = {
    title: this.props.selectedSet.title
  };

  handleTitleInput(val) {
    this.setState({ title: val });
  }

  render() {
    return (
      <form id="create-set" className="addset--container">
        <h4 className="viewset-title">{this.state.title}</h4>
        <h4>Title:</h4>
        <input
          onChange={e => this.props.handleTitleInput(e.target.value)}
          value={this.state.title}
          type="text"
        />
        <div className="viewset-songs" />
        <button className="viewset-addsongs-button">Add Songs</button>
      </form>
    );
  }
}
