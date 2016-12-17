import React, {Component} from 'react';
import {AppStyles} from './style';

import {
    View,
    Text,
    Navigator
} from 'react-native';

import {
    Container,
    Content ,
} from 'native-base';


export default class Home extends Component {
    render() {
        return (
            <Container style={AppStyles.Container}>
                <Content>
                </Content>
            </Container>
        );
    }
}