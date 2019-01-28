import React, { Component } from "react";
import { connect } from "react-redux";
import "../ViewSongs/viewsongs.css";
import "./addset.css";
import axios from "axios";
import x1 from "../ViewSet/x7d.svg";
import ViewSongsNewSet from "../ViewSongs/ViewSongsNewSet";

class AddSet extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      setSongs: [],
      addSongMode: false,
      songInf: [],
      songIds: []
    };
  }

  handleTitleInput(val) {
    this.setState({ title: val });
  }
  addSongToggle = () => {
    this.setState({ addSongMode: true });
  };
  clearSet = () => {
    document.getElementById("create-song").reset();
  };

  deleteSong = id => {
    let remainingSongs = this.state.setSongs;
    let songIndex = remainingSongs.findIndex(song => song.id === id);
    remainingSongs.splice(songIndex, 1);
    this.setState({ setSongs: remainingSongs });
  };

  async addSet() {
    let newSet = {
      title: this.state.title,
      id: this.props.user.id,
      songs: this.state.songIds
    };
    await axios.post(`/api/set`, { newSet });
    this.props.componentDidMount();
  }

  addSong = (song, songId) => {
    let setSongs = this.state.setSongs;
    let songIds = this.state.songIds;
    setSongs.push(song);
    songIds.push(songId);
    this.setState({ setSongs: setSongs, songIds: songIds });
  };

  render() {
    let viewSetSongs = this.state.setSongs.map(song => {
      return (
        <div className="song" key={song.id} style={{ position: "relative" }}>
          <img
            className="x"
            src={x1}
            onClick={() => this.deleteSong(song.id)}
          />
          <div className="key-title">
            <h5>{song.key}</h5>
            <h5 className="verticalbar"> | </h5>
            <h5 className="key-title-song-title">{song.song_title}</h5>
          </div>
          <div className="tuning-chords">
            <h5>{song.tuning}</h5>
            <h5 className="verticalbar"> | </h5>
            <h5>{song.chords}</h5>
          </div>
        </div>
      );
    });

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
          <div className="addset-songs">{viewSetSongs}</div>
          <div style={{ display: "flex", height: "85px" }}>
            <div className="addset-buttons">
              <button onClick={() => this.props.createSetToggle()}>
                Cancel
              </button>
              <button onClick={() => this.addSet()}>Save Set</button>
            </div>
          </div>
        </form>
        <div>
          <ViewSongsNewSet addSong={this.addSong} />
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
        <div className="addset-songs">{viewSetSongs}</div>
        <div style={{ display: "flex", height: "85px" }}>
          <button onClick={this.addSongToggle}>Add Song</button>
          <div className="addset-buttons">
            <button onClick={() => this.props.createSetToggle()}>Cancel</button>
            <button onClick={() => this.addSet()}>Save Set</button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddSet);
