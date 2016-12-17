/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        // this.getAuthenticationInfo();
        console.log(this.props);
    }

    getAuthenticationInfo() {
        AsyncStorage.getItem('login_token', (err, res) => {
            if (!err) {
                this.setState({
                    login_token: res
                })
            }
        });
    }

    goToLogin() {
        this.props.navigator.push({id: 'login'});
    }

    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
                <TouchableOpacity onPress={this.goToLogin.bind(this)}>
                    <Text>Auth</Text>
                </TouchableOpacity>
            </View>
        );
    }
}