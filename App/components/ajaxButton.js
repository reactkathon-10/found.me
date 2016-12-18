import React, {Component} from 'react';
import {Button, Spinner} from 'native-base';

export default class AjaxButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }

    validate() {
        var validation = this.props.validation;

        for (var input in validation) {
            for (var rule in validation[input]) {
                if (!this.checkRule(rule, input)) {
                    return validation[input][rule];
                }
            }
        }

        return true;
    }

    checkRule(rule, input) {
        var data = this.props.data;
        switch (rule) {
            case 'require':
                return data[input].length > 0;
            case 'confirm':
                return data[input] === data[input + 'Confirmation'];
            case 'email':
                var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(data[input]);
        }

        return true;
    }

    sendRequest() {
        var validate = this.validate();
        if (validate !== true) {
            alert(validate);
            return;
        }

        this.setState({disabled: true});
        fetch(this.props.url,
            {
                method: this.props.method || 'GET',
                body: JSON.stringify(this.props.data || {}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then((res) => {
                this.setState({disabled: false});
                if (this.props.onSuccess) {
                    this.props.onSuccess(res);
                }
            })
            .catch((err) => {
                this.setState({disabled: false});
                if (this.props.onError) {
                    this.props.onError(err)
                }
            });
    }

    render() {
        return (
            <Button block success style={this.props.style}
                    disabled={this.state.disabled}
                    onPress={this.sendRequest.bind(this)}>
                {this.state.disabled ? <Spinner /> : this.props.title}
            </Button>
        )
    }
}