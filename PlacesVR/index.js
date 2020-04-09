import React from "react";
import { AppRegistry } from "react-360";
import App from "./components/App";

export default class Hello360 extends React.Component {
  render() {
    return (
      <App/>
    );
  }
}
// Our component will keep track of this state

AppRegistry.registerComponent("Hello360", () => Hello360);
