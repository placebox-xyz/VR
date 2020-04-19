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

  updateAppState = () => {
    this.setState({ user: fire.auth().currentUser });
    // ? this.setState({ user: fire.auth().currentUser })
    // : null;
  };

  render() {
    if (this.state.user) {
      // eventually pass things like current user data
      // and a function to update the db of the user data when a photo is
      // uploaded
      return (
        <Landing
          user={fire.auth().currentUser.email}
          updateAppState={this.updateAppState}
        />
      );
    } else {
      return <SignIn />;
    }
  }
}

/**
 * Allows for App state to be manipulated by child components
 * need this for when uploading a photo
 * - upload photo to db --> update state in App which re-renders landing
 * with the update props (containing new data from the db)
 */
// updateAppState = ({ compiling, landingHandlers, pdfPath, latexPath }) => {
//   this.setState({
//     ...(pdfPath != undefined && { pdfPath }),
//     ...(latexPath != undefined && { latexPath }),
//     ...(compiling != undefined && { compiling }),
//     ...(landingHandlers != undefined && { landingHandlers }),
//   });
// };
