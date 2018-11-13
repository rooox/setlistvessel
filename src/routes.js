import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewSets from "./components/ViewSets/ViewSets";
import ViewSongs from "./components/ViewSongs/ViewSongs";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Goodbye from "./components/Goodbye/Goodbye";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/sets" component={ViewSets} />
    <Route path="/songs" component={ViewSongs} />
    <Route path="/about" component={About} />
    <Route path="/profile" component={Profile} />
    <Route path="/goodbye" component={Goodbye} />
  </Switch>
);
