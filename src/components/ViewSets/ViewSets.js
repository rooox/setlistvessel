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

  getSet(id) {
    axios.get(`/api/set/${id}`).then(res => {
      this.setState({
        setlist: res.data
      });
      console.log("Setlist id", id);
      console.log("res.data", res.data);
      console.log("Setlist", this.state.setlist);
    });
  }

  viewSetToggle = set => {
    this.setState({
      viewSet: true,
      selectedSet: set,
      addSet: false,
      editMode: false
    });
    this.getSet(set.id);
    console.log(this.state.viewSet);
  };

  createSetToggle = () => {
    this.setState({ addSet: !this.state.addSet, viewSet: false });
    console.log(this.state.addSet);
  };

  editSetToggle = () => {
    this.setState({ editMode: true });
  };

  render() {
    // console.log("in render:", this.state.sets);
    let displaySets = this.state.sets.map(set => {
      return (
        <div
          onClick={() => this.viewSetToggle(set)}
          // onClick={() => this.getSet()}
          className="set"
          key={set.id}
        >
          <h5>{set.title}</h5>
          {/* <img src={editPencil} className="editpencil" alt="edit" /> */}
        </div>
      );
    });

    return this.state.addSet || this.state.viewSet ? (
      this.state.addSet ? (
        <div className="background">
          {/* //{" "}
          <div className="viewsets">
            // <h4 className="yoursets">Your Sets</h4>
            // <div className="set--container" />
            // <div>{displaySets}</div>
            // <button onClick={() => this.createSetToggle()}>Add Set</button>
            //{" "} */}
          {/* </div> */}
          <AddSet
            componentDidMount={this.componentDidMount}
            sets={this.state.sets}
            createSetToggle={this.createSetToggle}
          />
        </div>
      ) : (
        <div className="background">
          {/* // <div className="viewsets">
          //   <h4 className="yoursets">Your Sets</h4>
          //   <div className="set--container" />
          //   <div>{displaySets}</div>
          //   <button onClick={() => this.createSetToggle()}>Add Set</button>
          // </div> */}
          <ViewSet
            componentDidMount={this.componentDidMount}
            sets={this.state.sets}
            createSetToggle={this.createSetToggle}
            selectedSet={this.state.selectedSet}
            editSetToggle={this.editSetToggle}
            editMode={this.state.editMode}
            setlist={this.state.setlist}
          />
        </div>
      )
    ) : (
      <div className="background">
        <div className="viewsets">
          <h4 className="yoursets">Your Sets</h4>
          <div className="set--container" />
          <div>{displaySets}</div>
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
