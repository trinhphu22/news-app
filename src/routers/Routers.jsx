import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Windows from "../pages/Windows";
import Mobile from "../pages/Mobile";
import OfficeSoftware from "../pages/OfficeSoftware";
import Apple from "../pages/Apple";
import ReadNew from "../pages/ReadNew";
import Account from "../pages/Account";
import Author from "../pages/Author";
// import Admin from "../pages/Admin";
import AdminDashboard from "../pages/AdminDashboard";
import Profile from "../pages/Profile";
import Message from "../pages/Message";
import EditProfile from "../pages/EditProfile";

import AuthProvider from "../Context/AuthProvider";

import Test from "../pages/Test";

const Routers = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/windows" exact component={Windows} />
        <Route path="/mobile" exact component={Mobile} />
        <Route path="/office-suites" exact component={OfficeSoftware} />
        <Route path="/apple" exact component={Apple} />
        <Route path="/article/" component={ReadNew} />
        <Route path="/profile/" exact component={Profile} />
        <Route path="/message/" exact component={Message} />
        <Route path="/postnew/" exact component={Author} />
        <Route path="/profile/edit/" exact component={EditProfile} />
        <AuthProvider>
          <Route path="/account" exact component={Account} />
          {/* <Route path="/account/admin" exact component={Admin} /> */}
          <Route path="/admindashboard" exact component={AdminDashboard} />
        </AuthProvider>
        <Route path="/test" exact component={Test} />
      </Switch>
    </div>
  );
};

export default Routers;
