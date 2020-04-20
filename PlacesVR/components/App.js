import React from "react";
import {
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset,
} from "react-360";
import fire from "../Firebase";
import Landing from "./Landing/Landing";
import SignIn from "./SignIn/SignIn";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.authListener();
  }

  /**
   * Sets the user state to the current logged in user (either from cookies or login)
   * via SignIn.js inputs
   */
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log("user full json: ", user);
      // console.log("Current User: ", fire.auth().currentUser.email);
      if (user) {
        this.setState({ user: user });
      } else {
        console.log("user logged out.");
        this.setState({ user: null });
      }
    });
  }

  /**
   * Allows for App state to be manipulated by child components
   * need this for when uploading a photo
   * - upload photo to db --> update state in App which re-renders landing
   * with the update props (containing new data from the db)
   */
  updateAppState = () => {
    this.setState({ user: fire.auth().currentUser });
    // ? this.setState({ user: fire.auth().currentUser })
    // : null;
  };

  // updateAppUserDataState = (data) => {
  //   console.log("in here this is the data", data);
  //   this.setState({ userData: data });
  // };

  render() {
    if (this.state.user) {
      return (
        <Landing
          user={fire.auth().currentUser.email}
          updateAppState={this.updateAppState}
        />
      );
    } else {
      return <SignIn updateAppUserDataState={this.updateAppUserDataState} />;
    }
  }
}
