import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SimpleInput } from "./sub-components/Form-Inputs";
import { LOG_IN_MODAL } from "../actions/modals";
import { logIn } from "../actions/auth";

//FAICON {tag, type, size}

const LogIn = () => {
  const dispatch = useDispatch();
  const { logInDisplay } = useSelector((state) => state.modals);
  const { errors } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    if (name === "email") {
      setEmail(event.target.value);
    } else if (name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(logIn({ email, password }));
  };

  const demoUser = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(logIn({ email: "demo@gmail.com", password: "password" }));
  };

  const modalOff = () => {
    dispatch({ type: LOG_IN_MODAL, display: "none" });
  };

  if (!logInDisplay) return null;
  return (
    <div id="log-in-modal" className="modal" style={{ display: logInDisplay }}>
      <div className="modal-background" onClick={modalOff}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Log In</p>
        </header>
        <section className="modal-card-body">
          <ul>
            {errors.map((error, i) => {
              return <li key={i}>{error}</li>;
            })}
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <SimpleInput
                type="email"
                label="Email"
                placeHolder="What's your email address?"
                value={email}
                handleChange={handleChange}
                require={true}
                name="email"
                FAIconLeft="fas fa-envelope"
              ></SimpleInput>
              <SimpleInput
                type="password"
                label="Password"
                placeHolder="Choose A Password"
                value={password}
                handleChange={handleChange}
                require={true}
                name="password"
                FAIconLeft="fas fa-lock"
              ></SimpleInput>
            </div>
            <div className="field">
              <div className="control login-buttons">
                <button className="button background wine-color" type="submit">
                  Log In
                </button>
                <button
                  className="button background wine-color"
                  onClick={demoUser}
                >
                  Demo User
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LogIn;
