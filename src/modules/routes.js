import React from "react";
import {
  Switch, Route, 
} from "react-router-dom";

import HomePage from "./pages/homePage";
import Authentication from "./pages/authentication";
import VotingList from "./pages/petitionList";
import PetitionList from "./pages/petitionList";

export default () => {
  return (
    <Switch>
      <Route path = "/" component = {HomePage} exact/>
      <Route path = "/login" component = {Authentication}/>
      <Route path = "/register" component = {Authentication}/>
      <Route path = "/petition" component = {PetitionList} exact/>
      <Route path = "/voting" component = {VotingList} exact/>
    </Switch>
  )
}