/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Router from './router';
import {
  AppRegistry
} from 'react-native';

export default class App extends Component {
  render() {
    return (
        <Router />
    );
  }
}

AppRegistry.registerComponent('App', () => App);
