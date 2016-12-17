import React, {Component} from 'react';
import {AppStyles} from './style';
import Communications from 'react-native-communications';

import {
    View,
    Navigator
} from 'react-native';

import {
    Container,
    Content ,
    Button,
    Icon,
    ListItem,
    CheckBox,
    Text
} from 'native-base';


export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            user: {}
        };
        console.log(props);
        this.getUserInfo();
    }

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

    getUserInfo() {
        fetch('http://192.168.3.157:8080/users/' + this.props.userId)
            .then((response) => response.json())
            .then((res) => {
                if (res.status === "success") {
                    this.setState({
                        user: res.data
                    })
                } else {
                    alert(res.message);
                }
            });
    }

    includeLocation(bool) {
        if (!bool) {
            this.setState({
                location: null
            });
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        location: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    });
                },
                (error) => {
                    alert(error.message);
                    this.setState({
                        location: null
                    })
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );
        }
    }

    buildContent() {
        if (!this.state.user) {
            return (
                <Content/>
            )
        }

        return (
            <Content>
                <ListItem>
                    <Text>{this.state.user.phone}</Text>
                </ListItem>
                <ListItem>
                    <Text>{this.state.user.email}</Text>
                </ListItem>
                <ListItem>
                    <CheckBox checked={!!this.state.location}
                              onPress={this.includeLocation.bind(this)} />
                    <Text>Include my location</Text>
                </ListItem>
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
                    <Icon name="ios-notifications" />
                    Push Notification
                </Button>
            </Content>
        )
    }

    render() {
        return (
            <Container style={AppStyles.Container}>
                {this.buildContent()}
            </Container>
        );
    }
}