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

// keyboard: https://github.com/danielbuechele/react-360-keyboard

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {
        email: "",
        password: "",
        // TODO: get password to be * as placeholder instead of actual chars
        passwordPlaceholder: "",
      },
      error: "",
      loggingIn: false,
    };
  }

  handleEmailInputChange() {
    NativeModules.Keyboard.startInput({
      placeholder: "Email",
      dictation: false,
      returnKeyLabel: "Submit",
      emoji: false,
    }).then((input) =>
      this.setState((prevState) => ({
        userData: {
          ...prevState.userData,
          email: input ? input : "", 
        },
      }))
    );
  }

  // TODO: insert *'s as values instead of the actual input
  handlePasswordInputChange() {
    NativeModules.Keyboard.startInput({
        placeholder: "Password",
        dictation: false,
        returnKeyLabel: "Submit",
        emoji: false,
      }).then((input) =>
        this.setState((prevState) => ({
          userData: {
            ...prevState.userData,
            password: input ? input : "", 
            passwordPlaceholder: input ? this.displayAsterisksForPassword(input) : "",
          },
        }))
      );
  }

    // see TODO above
  displayAsterisksForPassword(input) {
      const length = input.length;
      let p = "";
      let i = 0;
      while (i < length) {
        p = p.concat("*");
        i += 1;
      }
      return p;
  }

  render() {
    return (
      <View style={styles.panel}>
        <Text>Sign In</Text>
        <VrButton
          style={styles.greetingBox}
          onClick={() => this.handleEmailInputChange()}
        >
          <Text style={styles.greeting}>
            {this.state.userData.email === ""
              ? "Email"
              : this.state.userData.email}
          </Text>
        </VrButton>

        <VrButton style={styles.greetingBox} onClick={() => this.handlePasswordInputChange()}>
          <Text style={styles.greeting}>
            {this.state.userData.password === ""
              ? "Password"
              : this.state.userData.passwordPlaceholder}
          </Text>
        </VrButton>


        <VrButton style={styles.submitBox} onClick={() => console.log("user data: ", this.state.userData)}>
          <Text style={styles.greeting}>
            Submit
          </Text>
        </VrButton>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2,
  },
  submitBox: {
    padding: 20,
    backgroundColor: "#00ff00",
    borderColor: "#639dda",
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});
