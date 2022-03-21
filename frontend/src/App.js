import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CrudTable from "./components/Table";
import AddNew from "../src/components/AddNew";
import EditTab from "./components/EditTab";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={CrudTable} />
          <Route path="/addNew" exact={true} component={AddNew} />
          <Route path="/edit/:id" component={EditTab} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
