import React from "react";
import { AppRegistry } from "react-360";
import App from "./components/App";

export default class PlacesVR extends React.Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent("PlacesVR", () => PlacesVR);
