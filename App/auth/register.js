/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {AppStyles} from '../style';
import { Container, InputGroup, Input, Icon, Button } from 'native-base';
import { View, TouchableOpacity, Text, Alert } from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goToLogin() {
        this.props.navigator.replace({id: 'login'});
    }

    registerCallback() {

    }

    doRegister() {

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
                        <Icon name='ios-mail' style={AppStyles.InputIcon}/>
                        <Input placeholder='Email'
                               onChangeText={(email) => this.setState({email})}
                               autoCapitalize="none"
                               autoCorrect={false}
                               value={this.state.email}/>
                    </InputGroup>
                    <InputGroup style={AppStyles.InputGroup}>
                        <Icon name='ios-lock' style={AppStyles.InputIcon}/>
                        <Input placeholder='Password'
                               onChangeText={(password) => this.setState({password})}
                               value={this.state.password}
                               secureTextEntry={true}/>
                    </InputGroup>
                    <InputGroup style={AppStyles.InputGroup}>
                        <Icon name='ios-lock' style={AppStyles.InputIcon}/>
                        <Input placeholder='Password Confirmation'
                               onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
                               value={this.state.passwordConfirmation}
                               secureTextEntry={true}/>
                    </InputGroup>
                    <Button block success
                            style={AppStyles.Button}
                            onPress={this.doRegister.bind(this)}> Register </Button>
                    <TouchableOpacity style={{marginTop: 20}} onPress={this.goToLogin.bind(this)}>
                        <Text style={{textAlign: 'center'}}>Already have account? Login now!</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}