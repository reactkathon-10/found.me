import {
    StyleSheet
} from 'react-native';

export const AppStyles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },
    Content: {
        marginTop: 60
    },
    InputIcon: {
        color: '#00C497',
    },
    InputGroup: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    Button: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    NavigationBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#65a8c3',
    },
    NavBarText: {
        color: 'white',
        fontSize: 25,
        marginTop: 10
    },
    NavBarIconLeft: {
        color: 'white',
        marginLeft: 10,
        marginTop: 15
    },
    NavBarIconRight: {
        color: 'white',
        marginRight: 10,
        marginTop: 15
    }
});