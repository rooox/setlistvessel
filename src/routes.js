import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewSets from "./components/ViewSets/ViewSets";
import ViewSongs from "./components/ViewSongs/ViewSongs";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/sets" component={ViewSets} />
    <Route path="/songs" component={ViewSongs} />
    <Route path="/about" component={About} />
    <Route path="/profile" component={Profile} />
  </Switch>
);
