import React, { Component } from "react";
import "./viewsong.css";
import editPencil from "./editpencil.svg";
import "../ViewSongs/viewsongs.css";
import axios from "axios";

export default class ViewSong extends Component {
  state = {
    id: this.props.selectedSong.id,
    song_title: this.props.selectedSong.song_title,
    key: this.props.selectedSong.key,
    tuning: this.props.selectedSong.tuning,
    chords: this.props.selectedSong.chords,
    lyrics: this.props.selectedSong.lyrics,
    lightMode: false
  };

  handleTitleInput(val) {
    this.setState({ song_title: val });
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

  lightModeToggle() {
    this.setState({ lightMode: !this.state.lightMode });
  }
  editSong() {
    this.setState({
      id: this.props.selectedSong.id,
      song_title: this.props.selectedSong.song_title,
      key: this.props.selectedSong.key,
      tuning: this.props.selectedSong.tuning,
      chords: this.props.selectedSong.chords,
      lyrics: this.props.selectedSong.lyrics
    });
    this.props.editSongToggle();
  }

  async updateSong() {
    let updatedSong = {
      id: this.state.id,
      song_title: this.state.song_title,
      key: this.state.key,
      tuning: this.state.tuning,
      chords: this.state.chords,
      lyrics: this.state.lyrics
    };
    await axios.put(`api/song/`, { updatedSong });
    this.props.cancelEditSong();
    this.props.getSongs();
  }

  async deleteSong() {
    await axios.delete(`api/song/${this.state.id}`);
    this.props.cancelAddSong();
    this.props.getSongs();
  }

  render() {
    return this.props.editMode ? (
      <form id="create-song" className="addsong--container">
        <h4>Title:</h4>
        <input
          onChange={e => this.handleTitleInput(e.target.value)}
          value={this.state.song_title}
          type="text"
        />
        <h4>Key:</h4>
        <input
          onChange={e => this.handleKeyInput(e.target.value)}
          type="text"
          value={this.state.key}
        />
        <h4>Tuning:</h4>
        <input
          onChange={e => this.handleTuningInput(e.target.value)}
          type="text"
          value={this.state.tuning}
        />
        <h4>Chords:</h4>
        <input
          onChange={e => this.handleChordsInput(e.target.value)}
          type="text"
          value={this.state.chords}
        />
        <h4>Lyrics:</h4>
        <textarea
          className="lyric-input"
          style={{ resize: "none" }}
          onChange={e => this.handleLyricsInput(e.target.value)}
          value={this.state.lyrics}
        />
        {/* </div> */}
        <div className="addsong-buttons">
          <button onClick={() => this.props.cancelEditSong()}>Cancel</button>
          <button onClick={() => this.updateSong()}>Save</button>
          <button
            onClick={() => this.deleteSong()}
            style={{ borderColor: "red" }}
          >
            Delete
          </button>
        </div>
      </form>
    ) : (
      <div
        className={
          this.state.lightMode
            ? "viewsong--container-light"
            : "viewsong--container"
        }
      >
        {/* <pre style={{ height: "10px" }} /> */}
        <img
          onClick={() => this.editSong()}
          className="pencil"
          src={editPencil}
        />
        <button
          onClick={() => this.lightModeToggle()}
          className={this.state.lightMode ? "dark-button" : "light-button"}
        >
          {this.state.lightMode ? "DARK MODE" : "LIGHT MODE"}
        </button>
        <h4
          className={
            this.state.lightMode ? "viewsong-title-light" : "viewsong-title"
          }
        >
          {this.props.selectedSong.song_title}
        </h4>
        <div
          className={
            this.state.lightMode ? "viewsong-details-light" : "viewsong-details"
          }
        >
          <h4
            className={
              this.state.lightMode ? "viewsong-key-light" : "viewsong-key"
            }
          >
            {this.props.selectedSong.key}
          </h4>
          <h4
            className={
              this.state.lightMode ? "viewsong-key-light" : "viewsong-key"
            }
          >
            |
          </h4>
          <h4
            className={
              this.state.lightMode ? "viewsong-tuning-light" : "viewsong-tuning"
            }
          >
            {this.props.selectedSong.tuning}
          </h4>
          <h4
            className={
              this.state.lightMode ? "viewsong-key-light" : "viewsong-key"
            }
          >
            |
          </h4>
          <h4
            className={
              this.state.lightMode ? "viewsong-chords-light" : "viewsong-chords"
            }
          >
            {this.props.selectedSong.chords}
          </h4>
        </div>
        <h4
          className={
            this.state.lightMode ? "viewsong-lyrics-light" : "viewsong-lyrics"
          }
        >
          {this.props.selectedSong.lyrics}
        </h4>
      </div>
    );
  }
}
