import React, {Component} from 'react';

import Home from './home';
import {
    Navigator,
} from 'react-native';
import QRCodeScreen from './components/QRCodeScreen';

export default class Router extends Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'home':
                return <Home navigator={navigator} />;
            case 'qrCodeScreen':
                return <QRCodeScreen navigator={navigator} />
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'home'}}
                renderScene={this.renderScene.bind(this)}
            />
    );
    }
}
