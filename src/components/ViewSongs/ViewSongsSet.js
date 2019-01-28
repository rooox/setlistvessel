import React, { Component } from "react";
import "./viewsongs.css";
import "../reset.css";
import axios from "axios";
// import expand from "./Expand.svg";
import AddSong from "../AddSong/AddSong";
// import ViewSong from "../ViewSong/ViewSong";
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
    });
  }

  createSongToggle = () => {
    this.setState({ addSong: !this.state.addSong, viewSong: false });
  };

  viewSongToggle = song => {
    this.setState({
      viewSong: true,
      selectedSong: song,
      addSong: false,
      editMode: false
    });
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

  addSongToSet(id) {
    axios.post(`api/setsong/${id}/${this.props.set_id}`);
    this.props.getSet();
  }

  render() {
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
              onClick={() => this.addSongToSet(song.id)}
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

    return this.state.addSong || this.state.viewSong ? (
      this.state.addSong ? (
        <div className="background">
          <div className="viewsongs">
            <h4 className="yoursongs">Add A Song</h4>
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
            <h4 className="yoursongs">Add A Song</h4>
            <input
              onChange={e => this.handleSearch(e.target.value)}
              placeholder="Search for a song by title..."
              style={{ width: "90%" }}
            />
            <div className="song--container" />
            <div className="displaysong">{displaySongs}</div>
          </div>
        </div>
      )
    ) : (
      <div className="viewsongs">
        <h4 className="yoursongs">Add A Song</h4>
        <input
          onChange={e => this.handleSearch(e.target.value)}
          placeholder="Search for a song..."
          style={{ width: "90%" }}
        />
        <div className="song--container" />
        <div className="displaysong">{displaySongs}</div>
        <div style={{ display: "flex" }} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // map redux state to component props
  return state;
}

export default connect(mapStateToProps)(ViewSongsSet);
