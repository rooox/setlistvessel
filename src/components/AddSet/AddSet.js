import React, { Component } from "react";
import { connect } from "react-redux";
import "../ViewSongs/viewsongs.css";
import "./addset.css";
import axios from "axios";
import ViewSongsSet from "../ViewSongs/ViewSongsSet";

class AddSet extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      addSongMode: false
    };
  }

  handleTitleInput(val) {
    this.setState({ title: val });
  }
  addSongToggle = () => {
    this.setState({ addSongMode: true });
    console.log(this.state.addSongMode);
  };
  clearSet = () => {
    document.getElementById("create-song").reset();
  };

  async addSet() {
    let newSet = {
      id: this.props.user.id,
      title: this.state.title,
      songs: []
    };
    await axios.post(`/api/Sets/`, { newSet });
    this.props.Sets.push(newSet);
    this.props.componentDidMount();
    // this.clearSet();
    console.log({ newSet });
    console.log(this.props.Sets);
  }

  render() {
    console.log(this.state.title);
    return this.state.addSongMode ? (
      <div className="addsongtoset">
        <form id="create-Set" className="addset--container">
          <h4 className="addset--settitle">{this.state.title}</h4>
          <h4>Title:</h4>

          <input
            onChange={e => this.handleTitleInput(e.target.value)}
            placeholder="Enter title..."
            type="text"
          />
          <div className="addset-songs">
            <p>Songs</p>
          </div>
        </form>
        <div>
          <ViewSongsSet />
        </div>
      </div>
    ) : (
      <form id="create-Set" className="addset--container">
        <h4 className="addset--settitle">{this.state.title}</h4>
        <h4>Title:</h4>
        <input
          onChange={e => this.handleTitleInput(e.target.value)}
          placeholder="Enter title..."
          type="text"
        />
        <div className="addset-songs">
          <p>Songs</p>
        </div>
        <button onClick={this.addSongToggle}>Add Song</button>
        <div className="addset-buttons">
          <button onClick={() => this.props.createSetToggle()}>Cancel</button>
          <button onClick={() => this.addSet()}>Save Set</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddSet);
