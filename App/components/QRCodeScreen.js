import React, {Component} from 'react';
import Dimensions from 'Dimensions';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Navigator,
} from 'react-native';

import Camera from 'react-native-camera';
const { width, height } = Dimensions.get('window');

class QRCodeScreen extends Component {
    constructor(props) {
        super(props);

        this.onBarCodeRead = this.onBarCodeRead.bind(this);
        this.state = {
            barCodeFlag: true
        };
    }

    onBarCodeRead(result) {
        const $this = this;
        const {
            barCodeFlag
        } = this.state;

        if (barCodeFlag) {
            this.setState({
                barCodeFlag: false
            });

            setTimeout(() => {
                $this.props.navigator.pop();
                $this.props.onSuccess(result.data);
            }, 30);
        }
    }

    render() {
        return (
            <Camera onBarCodeRead={this.onBarCodeRead} style={styles.camera}>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}/>
                </View>
            </Camera>
        );
    }
}

class CancelButton extends Component {
    render() {
        return (
            <View style={styles.cancelButton}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={styles.cancelButtonText}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    camera: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rectangle: {
        height: 150,
        width: 150,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },
    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 15,
        width: 100,
        marginBottom: 10,

    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0097CE',
    },
});

export default QRCodeScreen;
