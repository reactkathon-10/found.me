import React, {Component} from 'react';
import {AppStyles} from './style';
import NavigationBar from './navigationBar';
import Communications from 'react-native-communications';

import {
    View,
    Text,
    Navigator
} from 'react-native';

import {
    Container,
    Content ,
    Button,
    Icon,
    Header
} from 'native-base';


export default class UserInfo extends Component {
    phone = '+841227651851';

    sendSms() {
        Communications.text(this.phone, 'test body');
    }

    phoneCall() {
        Communications.phonecall(this.phone, true);
    }

    sendEmail() {
        Communications.email(['trunglett@gmail.com'], null, null, 'you lost something', 'my body text');
    }

    pushNotification() {
        Communications.web('https://github.com/facebook/react-native');
    }
    render() {
        return (
            <Container style={AppStyles.Container}>
                <Header>
                    <NavigationBar title='User Info'/>
                </Header>
                <Content>
                    <Button block success style={AppStyles.Button}
                            onPress={this.sendSms.bind(this)}>
                        <Icon name='ios-text' />
                        Send SMS
                    </Button>
                    <Button block success style={AppStyles.Button}
                            onPress={this.phoneCall.bind(this)}>
                        <Icon name='ios-call' />
                        Make a Phone Call
                    </Button>
                    <Button block success style={AppStyles.Button}
                            onPress={this.sendEmail.bind(this)}>
                        <Icon name='ios-mail' />
                        Send Email
                    </Button>
                    <Button block success style={AppStyles.Button}
                            onPress={this.pushNotification.bind(this)}>
                        <Icon name="ios-push" />
                        Push Notification
                    </Button>
                </Content>
            </Container>
        );
    }
}