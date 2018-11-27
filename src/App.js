import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { fallDown as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar menuToggle={this.menuToggle} />
        <div id="pageWrap">
          {routes}
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

{
  /* state = { */
}
{
  /* //   menuDisplay: false */
}
{
  /* //  */
}

{
  /* // handleStateChange(state) { */
}
{
  /* //   this.setState({ menuDisplay: state.isOpen }); */
}
{
  /* // } */
}

{
  /* // closeMenu() { */
}
{
  /* //   this.setState({ menuDisplay: false }); */
}
{
  /* // } */
}
{
  /* </div> */
}
{
  /* </div> */
}
{
  /* ); */
}

{
  /* // <div id="appComponent"> */
}
{
  /* //   Menu
        //     isOpen={this.state.menuDisplay}
        //     pageWrapId={"pageWrap"}
        //     outerContainerId={"appComponent"}
        //     right={true}
        //     style={{ background: "red" }}
        //     bodyClassName={"menu-open"}
        //     noOverlay
        //     bm-burger-button={{ height: "40px", width: "40px" }}
          // > */
}
{
  /* <div className="links">
              <Link to="/home">
                <h4>HOME</h4>
              </Link>
              <Link to="/sets">
                <h4>SETS</h4>
              </Link>
              <Link to="/songs">
                <h4>SONGS</h4>
              </Link>
              <Link to="/about">
                <h4>ABOUT</h4>
              </Link>
              <Link to="/profile">
                <h4>PROFILE</h4>
              </Link>
              <Link to="/">
                <h4>Login</h4>
              </Link>
              <Link to="/goodbye">
                <h4 className="logout--button" onClick={() => this.logout()}>
                  Logout
                </h4>
              </Link>
            </div>
          </Menu> */
}
