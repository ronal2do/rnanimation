/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Circle from './Circle';
import Pulse from './Pulse';

const hex2rgba = (hex, alpha) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
  if (alpha) {
    return `rgba(${r},${g},${b},${alpha})`
  } else {
    return `rgb(${r},${g},${b})`
  }
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Pulse color='white' numPulses={3} diameter={200} speed={20} duration={3500} >
          <Circle range={['0deg', '360deg']} />
        </Pulse>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
