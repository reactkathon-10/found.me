/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {AppStyles} from '../style';
import { Container, InputGroup, Input, Icon } from 'native-base';
import { View, TouchableOpacity, Text, AsyncStorage, Alert } from 'react-native';
import {Settings} from './../settings';
import AjaxButton from './../components/ajaxButton';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitDisabled: true,
            email: '',
            password: ''
        };
    }

    goToRegister() {
        this.props.navigator.replace({id: 'register'});
    }

    getFormData() {
        return {
            email: this.state.email,
            password: this.state.password,
        }
    }

    getValidation() {
        return {
            email: {
                require: 'Email is required',
                email: 'Email is not valid'
            },
            password: {
                require: 'Password is required'
            },
        }
    }

    loginCallback(res) {
        if (res.errors) {
            Alert.alert(res.name, res.message);
        } else {
            AsyncStorage.setItem('login_token', res.token);
        }
    }

    render() {
        return (
            <Container style={AppStyles.Container}>
                <View>
                    <InputGroup style={AppStyles.InputGroup}>
                        <Icon name='ios-mail' style={AppStyles.InputIcon}/>
                        <Input placeholder='Email'
                               onChangeText={(email) => this.setState({email})}
                               autoCapitalize="none"
                               autoCorrect={false}
                               keyboardType="email-address"
                               value={this.state.email}/>
                    </InputGroup>
                    <InputGroup style={AppStyles.InputGroup}>
                        <Icon name='ios-lock' style={AppStyles.InputIcon}/>
                        <Input placeholder='Password'
                               onChangeText={(password) => this.setState({password})}
                               value={this.state.password}
                               secureTextEntry={true}/>
                    </InputGroup>
                    <AjaxButton
                            style={AppStyles.Button}
                            url={Settings.backendServer + '/auth/local'}
                            data={this.getFormData()}
                            method='POST'
                            title='Login'
                            validation={this.getValidation()}
                            onSuccess={this.loginCallback.bind(this)}
                            onError={(error) => {
                                console.log(error);
                                Alert.alert('Error', 'Something went wrong!');
                            }}>
                    </AjaxButton>
                    <TouchableOpacity style={{marginTop: 20}} onPress={this.goToRegister.bind(this)}>
                        <Text style={{textAlign: 'center'}}>Doesn't have account? Register now!</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}