import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Platform,
    StatusBar,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    emailChanged,
    passwordChanged,
    loginPress
} from '../../redux/actions/loginAction';
import { Input, Button } from '../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, showMessage, showLoader } from '../../redux/actions/const';
import Text from 'react-native-text';
import {StackActions, NavigationActions} from "react-navigation";

export class LoginScreen extends Component {
    static navigationOptions = {
        title: "Login",
        headerStyle: {
            backgroundColor: colors.primaryOrange,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async componentDidMount(): void {
        let userInfo = await AsyncStorage.getItem("loginData");
        if(userInfo){
            this.setState({ loading: false });
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'TabView' })],
            });
            this.props.navigation.dispatch(resetAction);
        }
        else{
            this.setState({ loading: false });
        }
    }

    focusPassword = () => {
        if (passwordRef) passwordRef.focus();
    };

    onEmailChange = text => this.props.emailChanged(text);

    onPasswordChange = text => this.props.passwordChanged(text);

    onButtonPress = () => {
        if(this.props.email && this.props.password){
            this.props.loginPress(this.props.navigation);
        }
        else{
            showMessage("Please fill text fields!")
        }
    };

    renderStatusBar = () => {
        if (Platform.OS === 'android') {
            return <StatusBar translucent={true} backgroundColor={'transparent'} />;
        } else {
            return <StatusBar barStyle="light-content" />;
        }
    };

    renderEmailInput = () => (
        <View style={styles.inputWrap}>
            <Icon
                style={styles.iconStyle}
                name="ios-mail-open"
                size={20}
                color="#fff"
            />
            <View style={styles.wrapper}>
                <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    returnKeyType="next"
                    changeText={this.onEmailChange}
                    value={this.props.email}
                    onSubmitEditing={this.focusPassword}
                />
            </View>
        </View>
    );

    renderPasswordInput = () => {
        return (
            <View style={styles.inputWrap}>
                <Icon
                    style={styles.iconStyle}
                    name="ios-unlock"
                    size={20}
                    color="#fff"
                />
                <View style={styles.wrapper}>
                    <Input
                        rel={ref => (passwordRef = ref)}
                        secureTextEntry={true}
                        placeholder="password"
                        changeText={this.onPasswordChange}
                        value={this.props.password}
                        returnKeyType="go"
                        onSubmitEditing={this.onButtonPress}
                    />
                </View>
            </View>
        );
    };

    renderSubmitButton = () => (
        <Button stylesContainer={styles.btnContainer} title="Login" onPress={this.onButtonPress} />
    );

    renderInputs = () => {
        return (
            <View style={styles.formContainer}>
                <View style={styles.inputsContainer}>
                    {this.renderEmailInput()}
                    {this.renderPasswordInput()}
                </View>
                {this.renderSubmitButton()}
            </View>
        );
    };

    render() {

        const { loading } = this.state;

        if(loading){
            return showLoader;
        }

        return (
            <KeyboardAwareScrollView style={styles.containers}>
                <SafeAreaView style={styles.screenContainer} />
                <View style={{ flex: 1, justifyContent: 'center'}}>

                    {this.renderStatusBar()}
                    {this.renderInputs()}

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("SignupScreen")}>
                        <Text style={styles.signUpText}>Don't have an account? SIGN UP</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = {
    containers: {
        flex: 1,
        backgroundColor: colors.primaryOrange
    },
    screenContainer: {
        backgroundColor: colors.primaryOrange
    },
    formContainer: {
        padding: 10,
        flexDirection: 'column',
        marginBottom: 50
    },
    btnContainer: {
        marginTop: 35,
        backgroundColor: colors.darkGrey,
        alignItems: 'center',
        marginHorizontal: 0,
        borderRadius: 0
    },
    inputsContainer: {
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    signUpText: {
        marginTop: 20,
        textAlign: 'center',
        color: colors.white,
        fontWeight: 'bold', fontSize: 16
    },
    inputWrap: {
        borderColor: 'rgba(255,255,255,0.6)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 3,
        marginVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    wrapper: {
        flex: 1.5
    },
    iconStyle: {
        flex: 0.15,
        marginHorizontal: 5,
        paddingLeft: 10
    }
};

const mapStateToProps = ({ loginReducer }) => {
    const { email, password } = loginReducer;
    return { email, password };
};


export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginPress
})(LoginScreen);