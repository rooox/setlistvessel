import React, { Component } from "react";
import "./viewsongs.css";
import "../reset.css";
import axios from "axios";
import expand from "./Expand.svg";
import AddSong from "../AddSong/AddSong";
import ViewSong from "../ViewSong/ViewSong";
import { connect } from "react-redux";

class ViewSongs extends Component {
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
    console.log(this.props.user.id);
    axios.get(`/api/songs/${this.props.user.id}`).then(res => {
      console.log("hitting promise");
      console.log(res.data);
      this.setState({
        songs: res.data
      });
      // console.log("in component did mount", this.state.songs);
    });
  }

  getSongs = () => {
    axios.get(`/api/songs/${this.props.user.id}`).then(res => {
      this.setState({
        songs: res.data
      });
      console.log("in component did mount", this.state.songs);
    });
  };

  createSongToggle = () => {
    this.setState({ addSong: true, viewSong: false, editMode: false });
    console.log("this is create song toggle");
  };

  cancelEditSong = () => {
    this.setState({ addSong: false, editMode: false, viewSong: true });
    console.log("this is cancel edit");
  };

  cancelAddSong = () => {
    this.setState({ addSong: false, editMode: false, viewSong: false });
    console.log("add song:", this.state.addSong);
  };

  viewSongToggle = song => {
    this.setState({
      viewSong: true,
      selectedSong: song,
      addSong: false,
      editMode: false
    });
    console.log("selected song: ", song);
  };

  editSongToggle = () => {
    this.setState({ editMode: true });
  };

  handleSearch(filter) {
    this.setState({ filterSongs: filter });
  }

  render() {
    console.log("state.songs:", this.state.songs);
    console.log("user id:", this.props.user.id);
    let displaySongs;
    if (!this.state.filterSongs) {
      displaySongs = this.state.songs
        .sort(function(a, b) {
          var nameA = a.song_title.toUpperCase();
          var nameB = b.song_title.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        })
        .map(song => {
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
    } else {
      displaySongs = this.state.songs
        .filter(song => {
          return song.song_title
            .toLowerCase()
            .includes(this.state.filterSongs.toLowerCase());
        })
        .map(song => {
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
            cancelAddSong={this.cancelAddSong}
          />
        </div>
      ) : (
        <div>
          {" "}
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
              <button onClick={() => this.createSongToggle()}>Add Song</button>
            </div>
            <ViewSong
              componentDidMount={this.componentDidMount}
              songs={this.state.songs}
              createSongToggle={this.createSongToggle}
              selectedSong={this.state.selectedSong}
              editSongToggle={this.editSongToggle}
              editMode={this.state.editMode}
              cancelEditSong={this.cancelEditSong}
              getSongs={this.getSongs}
              cancelAddSong={this.cancelAddSong}
            />
          </div>
        </div>
      )
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
