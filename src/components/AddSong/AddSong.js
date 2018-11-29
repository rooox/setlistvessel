import React, { Component } from "react";
import { connect } from "react-redux";
import "../ViewSongs/viewsongs.css";
import axios from "axios";
class AddSong extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      key: "",
      tuning: "",
      chords: "",
      lyrics: ""
    };
  }

  handleTitleInput(val) {
    this.setState({ title: val });
  }
  handleKeyInput(val) {
    this.setState({ key: val });
  }
  handleTuningInput(val) {
    this.setState({ tuning: val });
  }
  handleChordsInput(val) {
    this.setState({ chords: val });
  }
  handleLyricsInput(val) {
    this.setState({ lyrics: val });
  }

  clearSong = () => {
    document.getElementById("create-song").reset();
  };

  async addSong() {
    let newSong = {
      id: 2,
      // id: this.props.user.id,
      song_title: this.state.title,
      key: this.state.key,
      tuning: this.state.tuning,
      chords: this.state.chords,
      lyrics: this.state.lyrics
    };
    await axios.post(`/api/songs/`, { newSong });
    this.props.songs.push(newSong);
    this.props.componentDidMount();
    this.props.cancelAddSong();
    // this.clearSong();
    console.log({ newSong });
    console.log(this.props.songs);
  }

  render() {
    console.log(this.state);
    return (
      <form id="create-song" className="addsong--container">
        {/* <div className="addsong--inputs"> */}
        <h4>Title:</h4>
        <input
          onChange={e => this.handleTitleInput(e.target.value)}
          placeholder="Enter title..."
          type="text"
        />
        <h4>Key:</h4>
        <input
          onChange={e => this.handleKeyInput(e.target.value)}
          type="text"
          placeholder="Enter key..."
        />
        <h4>Tuning:</h4>
        <input
          onChange={e => this.handleTuningInput(e.target.value)}
          type="text"
          placeholder="Enter tuning.."
        />
        <h4>Chords:</h4>
        <input
          onChange={e => this.handleChordsInput(e.target.value)}
          type="text"
          placeholder="Enter chords..."
        />
        <h4>Lyrics:</h4>
        <textarea
          className="lyric-input"
          style={{ resize: "none" }}
          onChange={e => this.handleLyricsInput(e.target.value)}
          placeholder="Enter lyrics..."
        />
        {/* </div> */}
        <div className="addsong-buttons">
          <button onClick={() => this.props.cancelAddSong()}>Cancel</button>
          <button onClick={() => this.addSong()}>Add Song</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddSong);
