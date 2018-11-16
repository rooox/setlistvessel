import React, { Component } from "react";
import "./viewsets.css";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "./../../dux/reducer";
// import editPencil from "./editpencil.svg";

class ViewSets extends Component {
  constructor() {
    super();

    this.state = {
      sets: []
    };
  }
  async componentDidMount() {
    console.log(this.props.user);
    let sets = await axios.get(`/api/sets/${this.props.user.id}`);
    this.setState({ sets: sets.data });
    console.log("in component did mount", this.state.sets);
  }

  render() {
    console.log("in render:", this.state.sets);
    let displaySets = this.state.sets.map(set => {
      return (
        <div className="set" key={set.id}>
          <h5>{set.title}</h5>
          {/* <img src={editPencil} className="editpencil" alt="edit" /> */}
        </div>
      );
    });
    return (
      <div className="background">
        <div className="viewsets">
          <h4 className="yoursets">Your Sets</h4>
          <div className="set--container" />
          <div>{displaySets}</div>
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
