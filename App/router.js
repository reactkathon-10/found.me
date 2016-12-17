import React, {Component} from 'react';

import Home from './home';
import UserInfo from './userInfo';
import {
    Navigator,
} from 'react-native';

export default class Router extends Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'home':
                return <Home navigator={navigator} />;
            case 'userInfo':
                return <UserInfo/>;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'userInfo'}}
                renderScene={this.renderScene.bind(this)}
            />
    );
    }
}