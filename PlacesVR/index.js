import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset,
} from 'react-360';

export default class Hello360 extends React.Component {
// Our component will keep track of this state
  state = {
    // count: 0,
    currentBackground: "360_world.jpg",
  };

  // This method increments our count, triggering a re-render
  // incrementCount = () => {
  //   this.setState({count: this.state.count + 1});
  // };
  
  changeBackground() {
    // Set the background to a 360 or 180 image
    Environment.setBackgroundImage(
      asset("calg.jpg"),
      {format: '2D'}, /* one of the formats mentioned above */
    );
  }

  render() {
    return (
      <View //style={styles.panel}>
      >
        <VrButton
          // onClick={this.incrementCount}
          onClick={this.changeBackground}
          style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Kananaskis
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Hello360', () => Hello360);
