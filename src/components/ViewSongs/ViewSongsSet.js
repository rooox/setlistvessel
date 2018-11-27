import React, { Component } from "react";
import "./viewsongs.css";
import "../reset.css";
import axios from "axios";
// import expand from "./Expand.svg";
import AddSong from "../AddSong/AddSong";
import ViewSong from "../ViewSong/ViewSong";
import { connect } from "react-redux";

class ViewSongsSet extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      filterSongs: "",
      addSong: false,
      viewSong: false,
      selectedSong: {},
      editMode: false
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
    this.setState({ addSong: !this.state.addSong, viewSong: false });
    console.log(this.state.addSong);
  };

  viewSongToggle = song => {
    this.setState({
      viewSong: true,
      selectedSong: song,
      addSong: false,
      editMode: false
    });
    console.log(this.state.viewSong);
  };

  addSongCancel = () => {
    this.setState({ addSong: false });
  };

  editSongToggle = () => {
    this.setState({ editMode: true });
  };
  handleSearch(filter) {
    this.setState({ filterSongs: filter });
  }

  render() {
    let displaySongs;
    if (!this.state.filterSongs) {
      displaySongs = this.state.songs.map(song => {
        return (
          <div
            onClick={() => this.viewSongToggle(song)}
            // onClick={() => this.handleSongClick(song)}
            className="song"
            key={song.id}
          >
            <div className="key-title">
              <h5>{song.key}</h5>
              <h5 className="verticalbar"> | </h5>
              <h5 className="key-title-song-title">{song.title}</h5>
            </div>
            <div className="tuning-chords">
              <h5>{song.tuning}</h5>
              <h5 className="verticalbar"> | </h5>
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
            <div
              onClick={() => this.viewSongToggle()}
              // onClick={() => this.handleSongClick(song)}
              className="song"
              key={song.id}
            >
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

    return this.state.addSong || this.state.viewSong ? (
      this.state.addSong ? (
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
        <div>
          {" "}
          <div className="viewsongs">
            <h4 className="yoursongs">Your Songs</h4>
            <input
              onChange={e => this.handleSearch(e.target.value)}
              placeholder="Search for a song by title..."
              style={{ width: "90%" }}
            />
            <div className="song--container" />
            <div className="displaysong">{displaySongs}</div>
            <button onClick={() => this.createSongToggle()}>New Song</button>
          </div>
          <ViewSong
            componentDidMount={this.componentDidMount}
            songs={this.state.songs}
            createSongToggle={this.createSongToggle}
            selectedSong={this.state.selectedSong}
            editSongToggle={this.editSongToggle}
            editMode={this.state.editMode}
          />
        </div>
      )
    ) : (
      <div className="viewsongs">
        <h4 className="yoursongs">Your Songs</h4>
        <input
          onChange={e => this.handleSearch(e.target.value)}
          placeholder="Search for a song..."
          style={{ width: "90%" }}
        />
        <div className="song--container" />
        <div className="displaysong">{displaySongs}</div>
        <button onClick={() => this.createSongToggle()}>New Song</button>
        <button onClick={() => this.addSongCancel()}>Cancel</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // map redux state to component props
  return state;
}

export default connect(mapStateToProps)(ViewSongsSet);