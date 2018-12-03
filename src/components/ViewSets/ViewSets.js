import React, { Component } from "react";
import "./viewsets.css";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "./../../dux/reducer";
import ViewSet from "../ViewSet/ViewSet";
import AddSet from "../AddSet/AddSet";

class ViewSets extends Component {
  constructor() {
    super();

    this.state = {
      sets: [],
      selectedSet: [],
      addSet: false,
      viewSet: false,
      editMode: false,
      setlist: []
    };
  }

  async componentDidMount() {
    console.log(this.props.user);
    let sets = await axios.get(`/api/sets/${this.props.user.id}`);
    this.setState({ sets: sets.data });
    console.log("in component did mount", this.state.sets);
  }

  // getSet(id) {
  //   axios.get(`/api/set/${id}`).then(res => {
  //     this.setState({
  //       setlist: res.data
  //     });
  //     console.log("Setlist id", id);
  //     console.log("res.data", res.data);
  //     console.log("Setlist", this.state.setlist);
  //   });
  // }

  viewSetToggle = set => {
    this.setState({
      viewSet: true,
      selectedSet: set,
      addSet: false,
      editMode: false
    });
    // this.getSet(set.id);
    console.log("view set", this.state.viewSet);
  };

  createSetToggle = () => {
    this.setState({ addSet: !this.state.addSet, viewSet: false });
    console.log(this.state.addSet);
  };

  editSetToggle = () => {
    this.setState({ editMode: true });
  };

  cancelEditSet = () => {
    this.setState({
      viewSet: true,
      addSet: false,
      editMode: false
    });
  };

  deleteSetBacktrack = () => {
    this.setState({
      viewSet: false,
      addSet: false,
      editMode: false
    });
  };

  render() {
    console.log("sets", this.state.sets);
    // console.log("in render:", this.state.sets);
    let displaySets = this.state.sets
      .sort(function(a, b) {
        var nameA = a.title.toUpperCase();
        var nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      })
      .map(set => {
        return (
          <div
            onClick={() => this.viewSetToggle(set)}
            // onClick={() => this.getSet()}
            className="set"
            key={set.id}
          >
            <h5>{set.title}</h5>
          </div>
        );
      });

    return this.state.addSet || this.state.viewSet ? (
      this.state.addSet ? (
        <div className="background">
          <AddSet
            componentDidMount={this.componentDidMount}
            sets={this.state.sets}
            createSetToggle={this.createSetToggle}
          />
        </div>
      ) : (
        <div className="background">
          <ViewSet
            componentDidMount={this.componentDidMount}
            sets={this.state.sets}
            createSetToggle={this.createSetToggle}
            selectedSet={this.state.selectedSet}
            editSetToggle={this.editSetToggle}
            editMode={this.state.editMode}
            setlist={this.state.setlist}
            cancelEditSet={this.cancelEditSet}
            viewSetToggle={this.viewSetToggle}
            state={this.state}
            deleteSetBacktrack={this.deleteSetBacktrack}
            // getSet={this.getSet}
          />
        </div>
      )
    ) : (
      <div className="background">
        <div className="viewsets">
          <h4 className="yoursets">Your Sets</h4>
          <div className="set--container" />
          <div className="displaysong">{displaySets}</div>
          <button onClick={() => this.createSetToggle()}>Add Set</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // map redux state to component props
  return state;
}

export default connect(
  mapStateToProps,
  { updateUser }
)(ViewSets);
