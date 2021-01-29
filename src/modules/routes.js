import React from "react";
import {
  Switch, Route, 
} from "react-router-dom";

import HomePage from "./pages/homePage";
import Authentication from "./pages/authentication";
import VotingList from "./pages/votingList";
import PetitionList from "./pages/petitionList";
import Voting from "./pages/voting";
import Petition from "./pages/petition";
import NewPetition from "./pages/newPetition";
import NewVoting from "./pages/newVoting";
import MyProfile from "./pages/myProfile";

const Routes = () => {
  return (
    <Switch>
      <Route path = "/" component = {HomePage} exact/>
      <Route path = "/login" component = {Authentication}/>
      <Route path = "/register" component = {Authentication}/>
      <Route path = "/petition" component = {PetitionList} exact/>
      <Route path = "/petition/new" component = {NewPetition} exact/>
      <Route path = "/petition/:petition_id" component = {Petition} exact/>
      <Route path = "/voting" component = {VotingList} exact/>
      <Route path = "/voting/new" component = {NewVoting} exact/>
      <Route path = "/voting/:voting_id" component = {Voting} exact/>
      <Route path = "/myProfile" component = {MyProfile} exact/>
    </Switch>
  )
}

export default Routes;