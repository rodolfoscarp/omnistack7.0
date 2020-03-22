import React from "react";
import { Route, Switch } from "react-router-dom";
import Feed from "./pages/Fedd";
import New from "./pages/New";

const Routes = props => {
  return (
    <Switch>
      <Route path="/" component={Feed} exact />
      <Route path="/new" component={New} />
    </Switch>
  );
};

export default Routes;
