import React, { Component } from "react";
import { connect } from "react-redux";
import "./profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="background">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "40px",
            textAlign: "center"
          }}
        >
          <h5>Firstname: {this.props.user.firstname} </h5>
          <h5>Lastname: {this.props.user.lastname}</h5>
          <h5>Email: {this.props.user.email}</h5>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // map redux state to component props
  return state;
}
export default connect(mapStateToProps)(Profile);
