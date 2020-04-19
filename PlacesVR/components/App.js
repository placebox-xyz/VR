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
      console.log("Current User: ", user);
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    if (this.state.user) {
      return <Landing />;
    } else {
      return (
        <SignIn />
      );
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
