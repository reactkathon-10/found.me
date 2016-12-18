import React, {Component} from 'react';

import {AppStyles} from './style';
import Login from './auth/login';
import Register from './auth/register';
import Home from './home';
import UserInfo from './userInfo';
import {
    Navigator,
    Text,
    AsyncStorage,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';
import {
    Icon
} from 'native-base';
import QRCodeScreen from './components/QRCodeScreen';

export default class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_token: null
        };

        this.routes = {
            home: {
                title: 'Home'
            },
            login: {
                title: 'Login'
            },
            register: {
                title: 'Register'
            }
        };
    }

    renderScene(route, navigator) {
        Object.assign(route, this.routes[route.id]);
        switch (route.id) {
            case 'home':
                return <Home navigator={navigator} {...route.passProps} />;
            case 'qrCodeScreen':
                return <QRCodeScreen navigator={navigator} {...route.passProps}/>
            case 'userInfo':
                return <UserInfo navigator={navigator} {...route.passProps}/>;
            case 'login':
                return <Login navigator={navigator} {...route.passProps} />;
            case 'register':
                return <Register navigator={navigator} {...route.passProps} />;
        }
    }

    componentWillMount() {
        setInterval(() => {
            this.getAuthenticationInfo();
        }, 1000);
    }

    getAuthenticationInfo() {
        AsyncStorage.getItem('login_token', (err, res) => {
            console.log('getAuthenticationInfo', err, res);
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
                    <Icon style={AppStyles.NavBarIconLeft} name="ios-arrow-back" />
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

    handleLogout() {
        Alert.alert('Confirmation', 'Do you want to log out?', [
            {
                text: 'Cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    AsyncStorage.removeItem('login_token');
                }
            }
        ]);
    }

    rightButton(route, navigator, index, navState) {
        if (!this.isAuthenticating(route)) {
            if (!this.isLoggedIn()) {
                return (
                    <TouchableOpacity onPress={() => navigator.push({id: 'login', title: 'Login'})}>
                        <Icon style={AppStyles.NavBarIconRight} name="ios-log-in" />
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity onPress={this.handleLogout.bind(this)}>
                        <Icon style={AppStyles.NavBarIconRight} name="ios-log-out" />
                    </TouchableOpacity>
                );
            }
        }


    }

    title(route, navigator, index, navState) {
        return (
            <Text style={AppStyles.NavBarText}>{route.title}</Text>
        );
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'home'}}
                renderScene={this.renderScene.bind(this)}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: this.leftButton.bind(this),
                            RightButton: this.rightButton.bind(this),
                            Title: this.title.bind(this)
                        }}
                        style={AppStyles.NavigationBar}
                    />
                }
            />
    );
    }
}
