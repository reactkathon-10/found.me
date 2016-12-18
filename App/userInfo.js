import React, {Component} from 'react';
import {AppStyles} from './style';
import Communications from 'react-native-communications';

import {
    View,
    Navigator,
    Alert
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
    }

    sendSms() {
        Communications.text(this.props.user.phone, this.getSmsContent());
    }

    getSmsContent() {
        return '';
    }

    phoneCall() {
        Communications.phonecall(this.props.user.phone, true);
    }

    sendEmail() {
        Communications.email([this.props.user.email], null, null, this.getEmailTitle(), this.getEmailBody());
    }

    getEmailTitle() {
        return '';
    }

    getEmailBody() {
        return '';
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
                    Alert.alert('Error', error.message);
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
            <Content style={AppStyles.Content}>
                <ListItem>
                    <Text>{this.props.user.phone}</Text>
                </ListItem>
                <ListItem>
                    <Text>{this.props.user.email}</Text>
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