import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import MainDocument from "./documents/MainDocument";

const BasicExample = () => (
  <Router>
    <Switch>
      <MainLayout exact path="/" component={MainDocument} />
    </Switch>
  </Router>
);

export default BasicExample;
