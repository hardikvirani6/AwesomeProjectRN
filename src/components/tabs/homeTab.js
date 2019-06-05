import React from "react";
import {View, Platform, AsyncStorage, StyleSheet} from "react-native";
import {Button} from "../common";
import {emailChanged, loginPress, logOutUser, passwordChanged} from '../../redux/actions/loginAction';
import {connect} from "react-redux";
import Text from 'react-native-text';
import {colors} from "../../redux/actions/const";
import ToastExample from '../nativeModule/ToastExample';

class HomeTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null
        };
    }

    async componentDidMount(): void {
        let userInfo = await AsyncStorage.getItem("loginData");
        if(userInfo){
            let users = JSON.parse(userInfo);
            this.setState({ email: users.email })
        }
    }

    onButtonPress = () => {
        this.props.logOutUser(this.props.navigation);
    };

    onNativeClick = () => {
        if(Platform.OS === "ios") {
            ToastExample.show("Awesome Alert from Ios", (error, events) => {
                if (error) {
                    alert(error);
                } else {
                    alert(events);
                }
            })
        }
        else{
            ToastExample.show('Awesome Toast from Android', ToastExample.SHORT);
        }
    };

    render() {
        const { email } = this.state;
        return (
            <View style={styles.containers}>

                <Text style={styles.userInfo}>Login User: {email}</Text>
                <Button stylesContainer={styles.btnContainer} title="Native Module" onPress={this.onNativeClick} />
                <Button title="Logout" onPress={this.onButtonPress} />

            </View>
        );
    }
}

const mapStateToProps = ({ loginReducer }) => {
    const { email, password } = loginReducer;
    return { email, password };
};

export default connect(mapStateToProps, {
    logOutUser
})(HomeTab);

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    userInfo: {
        fontSize: 16,
        padding: 10,
        fontWeight: '500', },
    btnContainer: {
        backgroundColor: colors.primaryOrange,
        width: '50%',
        alignItems: 'center',
        marginHorizontal: 0,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20
    },
});