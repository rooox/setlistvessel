import React, { Component } from "react";
import "./viewset.css";
import editPencil from "../ViewSong/editpencil.svg";
import EditSet from "../EditSet/EditSet";
import axios from "axios";
// import { connect } from "react-redux";

export default class ViewSet extends Component {
  state = {
    title: this.props.selectedSet.title,
    addSongsMode: false,
    setlist: []
  };

  handleTitleInput = val => {
    this.setState({ title: val });
  };

  addSongsToggle = () => {
    this.setState({ addSongsMode: true });
  };

  render() {
    let displaySet = this.props.setlist.map(set => {
      return (
        // <div className="viewset-songs" key={set.song_id}>
        <div className="song" key={set.song_id}>
          <div className="key-title">
            <h5>{set.key}</h5>
            <h5 className="verticalbar"> | </h5>
            <h5 className="key-title-song-title">{set.song_title}</h5>
          </div>
          <div className="tuning-chords">
            <h5>{set.tuning}</h5>
            <h5 className="verticalbar"> | </h5>
            <h5>{set.chords}</h5>
          </div>
        </div>
        // </div>
      );
    });

    return this.props.editMode ? (
      <form id="create-set" className="addset--container">
        <h4 className="viewset-title">{this.state.title}</h4>
        <h4>Title:</h4>
        <input
          onChange={e => this.handleTitleInput(e.target.value)}
          value={this.state.title}
          type="text"
        />
        <div className="viewset-songs">{displaySet}</div>
        <button
          onClick={this.addSongsToggle}
          className="viewset-addsongs-button"
        >
          Add Songs
        </button>
      </form>
    ) : (
      // <EditSet
      //   title={this.props.selectedTitle}
      //   handleTitleInput={this.handleTitleInput}
      // />
      <div className="viewset--container">
        <img
          onClick={() => this.props.editSetToggle()}
          className="pencil"
          src={editPencil}
        />
        <h4 className="viewset-title">{this.state.title}</h4>
        <div className="viewset-songs">{displaySet}</div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   // map redux state to component props
//   return state;
// }

// export default connect(mapStateToProps)(ViewSet);
