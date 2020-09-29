import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { LOG_OUT, ACCESS_TOKEN } from "../actions/auth";

const NavbarLoggedIn = () => {
  const dispatch = useDispatch();

  const { matches } = useSelector((state) => state.wines);

  const logOut = () => {
    document.cookie = `${ACCESS_TOKEN}= ;`;
    dispatch({ type: LOG_OUT });
  };
  return (
    <>
      <nav id="main-nav" className="navbar is-fixed-top is-transparent">
        <NavLink to="/find" className="logo navbar-brand">
          <img id="vinify-logo" src="static/2vinify_logo_1356x745.png" />
        </NavLink>
        <div className="navbar-menu">
          <div className="navbar-start"></div>
          <div className="navbar-end">
            <div className="navbar-item ">
              <NavLink className="" to="/find">
                Find wine
              </NavLink>
            </div>
            {matches ? (
              <div className="navbar-item">
                <NavLink to="/matches">Matches</NavLink>
              </div>
            ) : (
              <></>
            )}

            <div className="navbar-item">
              <NavLink to="/favorites">Favorites</NavLink>
            </div>
            <div className="navbar-item">
              <a onClick={logOut}>Log Out</a>
            </div>
          </div>
        </div>
      </nav>
    </>

    // TODO OTHER DIV THAT HASTHE SEARCH BAR THAT REPLACES THE NAVBAR
  );
};

export default NavbarLoggedIn;
