import React from "react";
import {
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset,
  AppRegistry,
  NativeModules,
} from "react-360";

import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import { registerKeyboard } from "react-360-keyboard";
import fire from "../../Firebase";
AppRegistry.registerComponent(...registerKeyboard);

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      menuHidden: false,
      currentBackground: "360_world.jpg",
    };
    props = {
      user: props.user,
      updateAppState: props.updateAppState,
    };
  }

  // This method increments our count, triggering a re-render
  // incrementCount = () => {
  //   this.setState({count: this.state.count + 1});
  // };

  hideMenu = () => {
    this.setState({ menuHidden: true });
  };

  showMenu = () => {
    this.setState({ menuHidden: false });
  };

  handleBackgroundChange = (b) => {
    switch (b) {
      case "calg":
        Environment.setBackgroundImage(asset("calg.jpg"), { format: "2D" });
        break;
      case "watchman":
        Environment.setBackgroundImage(asset("watchman_trail.jpg"), {
          format: "2D",
        });
        break;
      default:
        Environment.setBackgroundImage(asset("360_world.jpg"), {
          format: "2D",
        });
        break;
    }
  };

  onInputClick() {
    // 4.) show the keyboard
    NativeModules.Keyboard.startInput({
      placeholder: "Enter your name",
    }).then((input) => console.log("input is: ", input));
  }

  handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => this.props.updateAppState)
      .catch((err) => console.log("error signing out", err));
  };

  render() {
    // if (!this.state.loggedIn) {
    // }
    console.log("in landing, user from App: ", this.props.user);
    if (!this.state.menuHidden) {
      return (
        <View style={styles.panel}>
          <View style={styles.hideMenuPanel}>
            <VrButton onClick={this.hideMenu} style={styles.hideMenuBox}>
              <Text style={styles.greeting}>Hide Menu</Text>
            </VrButton>
            <VrButton onClick={this.handleLogout} style={styles.hideMenuBox}>
              <Text style={styles.greeting}>Logout</Text>
            </VrButton>
          </View>
          <View style={styles.placesPanel}>
            <VrButton
              onClick={() => this.handleBackgroundChange("calg")}
              style={styles.greetingBox}
            >
              <Text style={styles.greeting}>Kananaskis</Text>
            </VrButton>

            <VrButton
              onClick={() => this.handleBackgroundChange("watchman")}
              style={styles.greetingBox}
            >
              <Text style={styles.greeting}>
                Watchman Trail - Zion National Park
              </Text>
            </VrButton>

            <VrButton
              onClick={() => this.handleBackgroundChange("")}
              style={styles.clearBox}
            >
              <Text style={styles.clearText}>Clear</Text>
            </VrButton>

            <VrButton onClick={this.onInputClick} style={styles.clearBox}>
              <Text style={styles.clearText}>Show keyboard</Text>
            </VrButton>
          </View>
        </View>
      );
    } else {
      return (
        <View //style={styles.panel}>
        >
          <VrButton onClick={this.showMenu} style={styles.showMenuBox}>
            <Text style={{ color: "white" }}>Show Menu</Text>
          </VrButton>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  clearText: {
    color: "black",
    fontSize: 30,
  },
  clearBox: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderColor: "#ff0000",
    borderWidth: 2,
  },
  placesPanel: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
  hideMenuPanel: {},
  hideMenuBox: {
    padding: 1,
    marginRight: "18px",
    width: "14px",
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2,
  },
  showMenuBox: {
    width: "100px",
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});
