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
        name: "",
        email: "",
        password: "",
        // TODO: get password to be * as placeholder instead of actual chars
        passwordPlaceholder: "",
      },
      error: "",
      hasAccount: true,
    };
  }

  handleNameInputChange() {
    NativeModules.Keyboard.startInput({
      placeholder: "Enter your name",
      dictation: true,
      returnKeyLabel: "Submit",
      emoji: true,
      initialValue: this.state.userData.name,
    }).then((input) =>
      this.setState((prevState) => ({
        userData: {
          ...prevState.userData,
          name: input ? input : "",
        },
      }))
    );
  }

  handleEmailInputChange() {
    NativeModules.Keyboard.startInput({
      placeholder: "Email",
      dictation: false,
      returnKeyLabel: "Submit",
      emoji: false,
      initialValue: this.state.userData.email,
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
      initialValue: this.state.userData.password,
    }).then((input) =>
      this.setState((prevState) => ({
        userData: {
          ...prevState.userData,
          password: input ? input : "",
          passwordPlaceholder: input
            ? this.displayAsterisksForPassword(input)
            : "",
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
    if (this.state.hasAccount) {
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

          <VrButton
            style={styles.greetingBox}
            onClick={() => this.handlePasswordInputChange()}
          >
            <Text style={styles.greeting}>
              {this.state.userData.password === ""
                ? "Password"
                : this.state.userData.passwordPlaceholder}
            </Text>
          </VrButton>

          <VrButton
            style={styles.submitBox}
            onClick={() => console.log("user data: ", this.state.userData)}
          >
            <Text style={styles.greeting}>Submit</Text>
          </VrButton>

          <Text style={{ marginTop: 50 }}>Don't have an account? </Text>

          <VrButton
            style={styles.signUpBox}
            onClick={() =>
              this.setState(() => ({
                hasAccount: false,
                userData: {
                  email: "",
                  name: "",
                  password: "",
                  passwordPlaceholder: "",
                },
              }))
            }
          >
            <Text style={styles.greeting}>Sign Up!</Text>
          </VrButton>
        </View>
      );
    } else {
      return (
        <View style={styles.panel}>
          <Text>Sign Up</Text>
          <VrButton
            style={styles.greetingBox}
            onClick={() => this.handleNameInputChange()}
          >
            <Text style={styles.greeting}>
              {this.state.userData.name === ""
                ? "Name"
                : this.state.userData.name}
            </Text>
          </VrButton>

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

          <VrButton
            style={styles.greetingBox}
            onClick={() => this.handlePasswordInputChange()}
          >
            <Text style={styles.greeting}>
              {this.state.userData.password === ""
                ? "Password"
                : this.state.userData.passwordPlaceholder}
            </Text>
          </VrButton>

          <VrButton
            style={styles.submitBox}
            onClick={() => console.log("user data: ", this.state.userData)}
          >
            <Text style={styles.greeting}>Submit</Text>
          </VrButton>

          <Text style={{ marginTop: 50 }}>Already have an account? </Text>

          <VrButton
            style={styles.signUpBox}
            onClick={() =>
              this.setState(() => ({
                hasAccount: true,
                userData: {
                  email: "",
                  name: "",
                  password: "",
                  passwordPlaceholder: "",
                },
              }))
            }
          >
            <Text style={styles.greeting}>Sign In!</Text>
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
    backgroundColor: "#0000ff",
    borderColor: "#639dda",
    borderWidth: 2,
    marginTop: 5,
  },
  signUpBox: {
    padding: 10,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2,
    marginTop: 5,
  },
  greeting: {
    fontSize: 30,
  },
});
