import React, {Component} from 'react';

import Login from './auth/login';
import Register from './auth/register';
import Home from './home';
import UserInfo from './userInfo';
import {
    Navigator,
    Text,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

export default class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_token: null
        };
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'home':
                return <Home navigator={navigator} />;
            case 'userInfo':
                return <UserInfo navigator={navigator}/>;
            case 'login':
                return <Login navigator={navigator} />;
            case 'register':
                return <Register navigator={navigator} />;
        }
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

    leftButton(route, navigator, index, navState) {
        if (navigator.getCurrentRoutes().length > 1) {
            return (
                <TouchableOpacity onPress={() => navigator.pop()}>
                    <Text>Back</Text>
                </TouchableOpacity>
            )
        }
    }

    isAuthenticating(route) {
        return ['login', 'register'].indexOf(route.id) !== -1;
    }

    isLoggedIn() {
        return !!this.state.login_token;
    }

    rightButton(route, navigator, index, navState) {
        if (!this.isLoggedIn() && !this.isAuthenticating(route)) {
            return (
                <TouchableOpacity onPress={() => navigator.push({id: 'login', title: 'Login'})}>
                    <Text>Login</Text>
                </TouchableOpacity>
            );
        }

    }

    title(route, navigator, index, navState) {
        return (
            <Text>{route.title}</Text>
        );
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'userInfo'}}
                renderScene={this.renderScene.bind(this)}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: this.leftButton.bind(this),
                            RightButton: this.rightButton.bind(this),
                            Title: this.title.bind(this)
                        }}
                    />
                }
            />
    );
    }
}