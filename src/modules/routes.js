import React from "react";
import {
  Switch, Route, 
} from "react-router-dom";

import HomePage from "./pages/homePage";
import Authentication from "./pages/authentication";

export default () => {
  return (
    <Switch>
      <Route path = "/" component = {HomePage} exact/>
      <Route path = "/login" component = {Authentication}/>
      <Route path = "/register" component = {Authentication}/>
    </Switch>
  )
}