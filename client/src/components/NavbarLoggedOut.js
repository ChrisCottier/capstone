import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { SIGN_UP_MODAL, LOG_IN_MODAL } from "../actions/modals";

const NavbarLoggedOut = () => {
  const dispatch = useDispatch();
  // const [showLogin, setShowLogin] = useState(false)

  const showSignUp = () => dispatch({ type: SIGN_UP_MODAL, display: "block" });
  const showLogIn = () => dispatch({ type: LOG_IN_MODAL, display: "block" });
  return (
    <>
      <nav id="main-nav" className="navbar is-fixed-top is-transparent">
        <NavLink to="/" className="logo navbar-brand">
          <img id="vinify-logo" src="static/2vinify_logo_1356x745.png" />
        </NavLink>
        <div className="navbar-menu">
          <div className="navbar-start"></div>

          <div className="navbar-end">
            <div className="navbar-item">
              <a onClick={showSignUp}>Sign Up</a>
            </div>
            <div className="navbar-item">
              <a onClick={showLogIn}>Log In</a>
            </div>
          </div>
        </div>
      </nav>
      <LogIn></LogIn>
      <SignUp></SignUp>
    </>

    // TODO OTHER DIV THAT HASTHE SEARCH BAR THAT REPLACES THE NAVBAR
  );
};

export default NavbarLoggedOut;
