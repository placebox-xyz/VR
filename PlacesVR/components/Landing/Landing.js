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
import axios from "axios";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import { registerKeyboard } from "react-360-keyboard";
import fire from "../../Firebase";
AppRegistry.registerComponent(...registerKeyboard);

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuHidden: false,
      uploadScreen: false,
      currentBackground: "360_world.jpg",
      userData: {},
    };
    props = {
      user: props.user,
      updateAppState: props.updateAppState,
    };
  }

  componentDidMount() {
    // console.log("in cdm: landing");
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://us-central1-placesvr-3d707.cloudfunctions.net/getUserData",
        {
          email: this.props.user,
        }
      )
      .then((response) => {
        console.log("from getUserData cloudfunction: ", response);
        this.setState({ userData: response.data });
      })
      .catch(() => console.log("failed to get user data"));
    // this.props.updateAppState;
  }

  showUploadScreen = () => {
    this.setState({ uploadScreen: true });
  };

  hideUploadScreen = () => {
    this.setState({ uploadScreen: false });
  };

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
  // User: {this.props.user ? this.props.user : ""}
  render() {
    // console.log("in landing, user from App: ", this.props.user);
    // console.log("userData in landing: ", this.state.userData);
    if (!this.state.menuHidden) {
      if (!this.state.uploadScreen) {
        return (
          <View style={styles.panel}>
            <View style={styles.hideMenuPanel}>
              <VrButton onClick={this.hideMenu} style={styles.hideMenuBox}>
                <Text style={styles.greeting}>Hide Menu</Text>
              </VrButton>
              <VrButton onClick={this.handleLogout} style={styles.hideMenuBox}>
                <Text style={styles.greeting}>Logout</Text>
              </VrButton>
              <VrButton
                onClick={this.showUploadScreen}
                style={styles.hideMenuBox}
              >
                <Text style={styles.greeting}>Upload</Text>
              </VrButton>
              <Text style={styles.greeting}>
                User:{" "}
                {this.state.userData.profile
                  ? this.state.userData.profile.email
                  : this.props.user}
              </Text>
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
        // upload screen
        return (
          <View style={styles.panel}>
            <View style={styles.hideMenuPanel}>
              <VrButton
                // need this button with blank text otherwise
                // it disapears after hiding menu
                onClick={this.hideUploadScreen}
                // style={styles.hideMenuBox}
              >
                <Text style={styles.greeting}> </Text>
              </VrButton>
              <VrButton
                onClick={this.hideUploadScreen}
                // style={styles.hideMenuBox}
              >
                <Text style={styles.greeting}>Go Back</Text>
              </VrButton>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.hiddenPanel}>
          <View>
            <VrButton onClick={this.showMenu} style={styles.showMenuBox}>
              <Text style={{ color: "white" }}>Show Menu</Text>
            </VrButton>
          </View>
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
  hiddenPanel: {
    width: 125,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
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
    // padding: 1,
    // marginRight: "18px",
    width: "14px",
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2,
  },
  showMenuBox: {
    width: "100px",
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
});
