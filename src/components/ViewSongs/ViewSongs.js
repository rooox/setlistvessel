import React, { Component } from "react";
import "./viewsongs.css";
import "../reset.css";
import axios from "axios";
import expand from "./Expand.svg";
import AddSong from "../AddSong/AddSong";
import { connect } from "react-redux";

class ViewSongs extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      filterSongs: "",
      addSong: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    axios.get(`/api/songs/${this.props.user.id}`).then(res => {
      this.setState({
        songs: res.data
      });
      console.log("in component did mount", this.state.songs);
    });
  }

  createSongToggle = () => {
    this.setState({ addSong: !this.state.addSong });
    console.log(this.state.addSong);
  };
  handleSearch(filter) {
    this.setState({ filterSongs: filter });
  }

  render() {
    let displaySongs;
    if (!this.state.filterSongs) {
      displaySongs = this.state.songs.map(song => {
        return (
          <div className="song" key={song.id}>
            <div className="key-title">
              <h5>{song.key}</h5>
              <h5> | </h5>
              <h5>{song.title}</h5>
            </div>
            <div className="tuning-chords">
              <h5>{song.tuning}</h5>
              <h5> | </h5>
              <h5>{song.chords}</h5>
            </div>
          </div>
        );
      });
    } else {
      displaySongs = this.state.songs
        .filter(song => {
          return song.title
            .toLowerCase()
            .includes(this.state.filterSongs.toLowerCase());
        })
        .map(song => {
          return (
            <div className="song" key={song.id}>
              <div className="key-title">
                <h5>{song.key}</h5>
                <h5> | </h5>
                <h5>{song.title}</h5>
              </div>
              <div className="tuning-chords">
                <h5>{song.tuning}</h5>
                <h5> | </h5>
                <h5>{song.chords}</h5>
              </div>
            </div>
          );
        });
    }

    return this.state.addSong ? (
      <div className="background">
        <div className="viewsongs">
          <h4 className="yoursongs">Your Songs</h4>
          <input
            onChange={e => this.handleSearch(e.target.value)}
            placeholder="Search for a song by title..."
            style={{ width: "90%" }}
          />
          <div className="song--container" />
          <div className="displaysong">{displaySongs}</div>
        </div>
        <AddSong
          componentDidMount={this.componentDidMount}
          songs={this.state.songs}
          createSongToggle={this.createSongToggle}
        />
      </div>
    ) : (
      <div className="background">
        <div className="viewsongs">
          <h4 className="yoursongs">Your Songs</h4>
          <input
            onChange={e => this.handleSearch(e.target.value)}
            placeholder="Search for a song..."
            style={{ width: "90%" }}
          />
          <div className="song--container" />
          <div className="displaysong">{displaySongs}</div>
          <button onClick={() => this.createSongToggle()}>Add Song</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // map redux state to component props
  return state;
}

export default connect(mapStateToProps)(ViewSongs);
