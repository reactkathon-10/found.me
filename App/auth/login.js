/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {AppStyles} from '../style';
import { Container, InputGroup, Input, Icon, Button } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goToRegister() {
        this.props.navigator.replace({id: 'register'});
    }

    loginCallback() {

    }

    doLogin() {
    }

    render() {
        return (
            <Container style={AppStyles.Container}>
                <View>
                    <InputGroup style={AppStyles.InputGroup}>
                        <Icon name='ios-person' style={AppStyles.InputIcon}/>
                        <Input placeholder='Name'
                               onChangeText={(username) => this.setState({username})}
                               autoCapitalize="none"
                               autoCorrect={false}
                               value={this.state.username}/>
                    </InputGroup>
                    <InputGroup style={AppStyles.InputGroup}>
                        <Icon name='ios-lock' style={AppStyles.InputIcon}/>
                        <Input placeholder='Password'
                               onChangeText={(password) => this.setState({password})}
                               value={this.state.password}
                               secureTextEntry={true}/>
                    </InputGroup>
                    <Button block success
                            style={AppStyles.Button}
                            onPress={this.doLogin.bind(this)}> Login </Button>
                    <TouchableOpacity style={{marginTop: 20}} onPress={this.goToRegister.bind(this)}>
                        <Text style={{textAlign: 'center'}}>Doesn't have account? Register now!</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}