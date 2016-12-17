import React, {Component} from 'react';
import {AppStyles} from './style';

import {
    View,
    Text,
    Navigator,
    StyleSheet,
    TouchableOpacity,
    AlertIOS
} from 'react-native';

import {
    Container,
    Content ,
} from 'native-base';
import QRCodeScreen from './components/QRCodeScreen';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.onPressQRCode = this.onPressQRCode.bind(this);
        this.onSucess = this.onSucess.bind(this);
    }

    onPressQRCode() {
        this.props.navigator.push({
            id: 'qrCodeScreen',
            component: QRCodeScreen,
            title: 'QRCode',
            passProps: {
                onSucess: this.onSucess,
            }
        });
    }

    onSucess(result) {
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
                <Content>
                    <TouchableOpacity onPress={this.onPressQRCode}>
                        <Text>Read QRCode</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    }
});
