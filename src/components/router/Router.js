import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import { Navbar } from "../navbar/Navbar";

import { Dashboard } from "../../pages/Dashboard";
import { Patients } from "../../pages/Patients";
import { Receptionists } from "../../pages/Receptionists";
import { Doctors } from "../../pages/Doctors";
import { Login } from "../../pages/Login";
import { Dates } from "../../pages/Dates";
import { RegisterDate } from "../../pages/RegisterDate";
import { Payments } from "../../pages/Payments";

export const Router = () => {
  const [token, setToken] = useState(localStorage.getItem("currentToken"));
  return (
    <>
      <header>
        <Navbar token={token} />
      </header>
      <Switch>
        <Route exact path="/" component={token ? Dashboard : Dashboard} />
        <Route
          exact
          path="/signin"
          render={(props) => <Login {...props} setToken={setToken} />}
        />
        <Route
          exact
          path="/dashboard"
          render={(props) => <Dashboard {...props} token={token} />}
        />
        <Route exact path="/patients" component={Patients} />
        <Route exact path="/doctors" component={Doctors} />
        <Route exact path="/dates" component={Dates} />
        <Route exact path="/registerDate" component={RegisterDate} />
        <Route exact path="/payments" component={Payments} />
        <Route exact path="/receptionist" component={Receptionists} />
      </Switch>
    </>
  );
};
