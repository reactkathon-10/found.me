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
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
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
    }
});