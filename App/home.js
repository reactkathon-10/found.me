import React, {Component} from 'react';
import {AppStyles} from './style';
import NavigationBar from './navigationBar';

import {
    View,
    Text,
    Navigator
} from 'react-native';

import {
    Container,
    Content ,
    Header
} from 'native-base';


export default class Home extends Component {
    render() {
        return (
            <Container style={AppStyles.Container}>
                <Header>
                    <NavigationBar title='Home'/>
                </Header>
                <Content>

                </Content>
            </Container>
        );
    }
}