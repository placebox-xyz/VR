import React from "react";
import {
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset,
} from "react-360";

// firebase stuff goes in here (to determine if authenticated)

import Landing from "./Landing/Landing";

export default class App extends React.Component {
  render() {
    return (
      <Landing />
    );
  }
};