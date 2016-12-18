import React, {Component} from 'react';
import {AppStyles} from './style';

import {
    View,
    Navigator,
    StyleSheet,
    Alert
} from 'react-native';

import {
    Container,
} from 'native-base';
import QRCodeScreen from './components/QRCodeScreen';
import {Settings} from './settings';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    onSuccess(result) {
        this.getUserInfo(result);
    }

    getUserInfo(code) {
        return fetch(Settings.backendServer + '/users?userCode=' + code)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.total == 1) {
                    var user = res.data[0];
                    this.props.navigator.push({
                        id: 'userInfo',
                        title: user.fullName,
                        passProps: {user}
                    });
                } else {
                    Alert.alert('Error', res.message);
                }
            })
            .catch((err) => {
                Alert.alert('Error', 'Something went wrong!');
            });
    }

    render() {
        return (
            <Container style={AppStyles.Container}>
                <View>
                    <QRCodeScreen navigator={this.props.navigator} onSuccess={this.onSuccess.bind(this)}/>
                </View>
            </Container>
        );
    }
}