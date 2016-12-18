/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {AppStyles} from '../style';
import { Container, InputGroup, Input, Icon } from 'native-base';
import { View, TouchableOpacity, Text, Alert, AsyncStorage } from 'react-native';
import {Settings} from './../settings';
import AjaxButton from './../components/ajaxButton';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitDisabled: false,
            email: '',
            user_name: '',
            full_name: '',
            password: '',
            passwordConfirmation: ''
        };
    }

    goToLogin() {
        this.props.navigator.replace({id: 'login'});
    }

    registerCallback(res) {
        if (res.errors) {
            Alert.alert(res.message, res.errors[0].message);
        } else {
            alert(JSON.stringify(res));
            AsyncStorage.setItem('login_token', res.token);
        }
    }

    getFormData() {
        return {
            email: this.state.email,
            fullName: this.state.name,
            phone: this.state.phone,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        };
    }

    getValidation() {
        return {
            email: {
                require: 'Email is required',
                email: 'Email is not valid'
            },
            password: {
                require: 'Password is required',
                confirm: 'Password confirmation doesn\'t match'
            },
            phone: {
                require: 'Phone is required',
            },
            fullName: {
                require: 'Username is required'
            },
        }
    }

    render() {
        return (
            <Container style={AppStyles.Container}>
                <View>
                    <InputGroup style={AppStyles.InputGroup}>
                        <Icon name='ios-person' style={AppStyles.InputIcon}/>
                        <Input placeholder='Name'
                               onChangeText={(name) => this.setState({name})}
                               autoCapitalize="none"
                               autoCorrect={false}
                               value={this.state.name}/>
                    </InputGroup>
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
                        <Icon name='ios-call' style={AppStyles.InputIcon}/>
                        <Input placeholder='Phone'
                               onChangeText={(phone) => this.setState({phone})}
                               autoCapitalize="none"
                               autoCorrect={false}
                               keyboardType="phone-pad"
                               value={this.state.phone}/>
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
                    <AjaxButton
                        style={AppStyles.Button}
                        url={Settings.backendServer + '/signup'}
                        data={this.getFormData()}
                        method='POST'
                        title='Register'
                        validation={this.getValidation()}
                        onSuccess={this.registerCallback.bind(this)}
                        onError={(error) => Alert.alert('Error', error.message || 'Something went wrong!')}>
                    </AjaxButton>
                    <TouchableOpacity style={{marginTop: 20}} onPress={this.goToLogin.bind(this)}>
                        <Text style={{textAlign: 'center'}}>Already have account? Login now!</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}