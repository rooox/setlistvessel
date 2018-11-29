import React, { Component } from "react";
import "./viewset.css";
import editPencil from "../ViewSong/editpencil.svg";
import EditSet from "../EditSet/EditSet";
import axios from "axios";
// import { connect } from "react-redux";
import x1 from "./x7d.svg";
import ViewSongsSet from "../ViewSongs/ViewSongsSet";

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

  async deleteSetSong(id) {
    let song_id = id;
    let set_id = this.props.selectedSet.id;

    console.log("ids=", song_id, set_id);
    await axios.delete(`api/setsong/${song_id}/${set_id}`);
  }

  async deleteSet() {
    let set_id = this.props.selectedSet.id;
    console.log("ids=", set_id);
    await axios.delete(`api/set/${set_id}`);
  }

  render() {
    console.log(this.props.setlist);
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
    let editDisplaySet = this.props.setlist.map(set => {
      return (
        // <div className="viewset-songs" key={set.song_id}>
        <div
          className="song"
          key={set.song_id}
          style={{ position: "relative" }}
        >
          <img
            className="x"
            src={x1}
            onClick={() => this.deleteSetSong(set.song_id)}
          />
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
      <div className="addsongtoset">
        <form id="create-set" className="addset--container">
          <h4 className="viewset-title edit">{this.state.title}</h4>
          <h4 className="edit-set-title">Title:</h4>
          <input
            className="edit-set-input"
            onChange={e => this.handleTitleInput(e.target.value)}
            value={this.state.title}
            type="text"
          />
          <div className="viewset-songs">{editDisplaySet}</div>
          <div>
            <button className="viewset-addsongs-button">Save Set</button>
            <button
              className="viewset-addsongs-button"
              onClick={() => this.props.cancelEditSet()}
            >
              Cancel
            </button>
            <button
              style={{ borderColor: "red" }}
              className="viewset-addsongs-button"
            >
              Delete Set
            </button>
          </div>
        </form>
        <div>
          <ViewSongsSet
            set_id={this.props.selectedSet.id}
            getSet={this.props.getSet}
          />
        </div>
      </div>
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

// return this.props.editMode ? (
//   <form id="create-set" className="addset--container">
//     <h4 className="viewset-title edit">{this.state.title}</h4>
//     <h4 className="edit-set-title">Title:</h4>
//     <input
//       className="edit-set-input"
//       onChange={e => this.handleTitleInput(e.target.value)}
//       value={this.state.title}
//       type="text"
//     />
//     <div className="viewset-songs">{editDisplaySet}</div>
//     <div>
//       <button
//         onClick={this.addSongsToggle}
//         className="viewset-addsongs-button"
//       >
//         Add Songs
//       </button>
//       <button
//         className="viewset-addsongs-button"
//         onClick={() => this.props.cancelEditSet()}
//       >
//         Cancel
//       </button>
//       <button className="viewset-addsongs-button">Delete Set</button>
//     </div>
//   </form>
// ) : (
//   // <EditSet
//   //   title={this.props.selectedTitle}
//   //   handleTitleInput={this.handleTitleInput}
//   // />
//   <div className="viewset--container">
//     <img
//       onClick={() => this.props.editSetToggle()}
//       className="pencil"
//       src={editPencil}
//     />
//     <h4 className="viewset-title">{this.state.title}</h4>
//     <div className="viewset-songs">{displaySet}</div>
//   </div>
// );
// }
// }
