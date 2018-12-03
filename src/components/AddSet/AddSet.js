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
      songInf: []
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

  deleteSong = id => {
    console.log("songid=,", id);
    let remainingSongs = this.state.setSongs;
    let songIndex = remainingSongs.findIndex(song => song.id === id);
    let removeSong = remainingSongs.splice(songIndex, 1);
    console.log("remainingSongs:", removeSong);
    // return remainingSongs;
    this.setState = { setSongs: remainingSongs };
    console.log("state.setSongs:", this.state.setSongs);
  };

  // songstuff = () => {
  //   let songInfo = this.state.setSongs.map(song => {
  //     [...song.id];
  //   });
  //   this.setState({ songInf: songInfo });
  // };
  // async addSet() {
  //   let songInfo = this.state.setSongs.map(song => {
  //     song.id;
  //   });
  //   let newSet = {
  //     id: this.props.user.id,
  //     title: this.state.title,
  //     songs: [songInfo]
  //   };
  //   await axios.post(`/api/Sets/`, { newSet });
  //   this.props.componentDidMount();
  //   // this.clearSet();
  //   console.log({ newSet });
  //   console.log(this.props.Sets);
  // }

  addSong = song => {
    // console.log("song", song);
    this.setState({
      setSongs:
        this.state.setSongs === [] ? song : [...this.state.setSongs, song]
    });
    console.log(this.state.songInf);
    // console.log("state songs", this.state.setSongs);
  };

  render() {
    let viewSetSongs = this.state.setSongs.map(song => {
      return (
        // <div className="viewset-songs" key={set.song_id}>
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
        // </div>
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
