/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

export default class NavigationBar extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
            </View>
        );
    }
}