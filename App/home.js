import React, {Component} from 'react';
import {AppStyles} from './style';

import {
    View,
    Navigator,
    StyleSheet,
} from 'react-native';

import {
    Container,
} from 'native-base';
import QRCodeScreen from './components/QRCodeScreen';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    onSuccess(result) {
        this.props.navigator.push({
            id: 'userInfo',
            passProps: {
                userId: result,
            }
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