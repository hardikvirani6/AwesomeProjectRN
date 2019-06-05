import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Platform,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    emailChanged,
    passwordChanged,
    signupPress
} from '../../redux/actions/signupAction';
import { Input, Button } from '../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {colors, showMessage} from '../../redux/actions/const';
import Text from 'react-native-text';

export class SignupScreen extends Component {
    static navigationOptions = {
        title: "Sign UP",
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

        };
    }

    focusPassword = () => {
        if (passwordRef) passwordRef.focus();
    };

    onEmailChange = text => this.props.emailChanged(text);

    onPasswordChange = text => this.props.passwordChanged(text);

    onButtonPress = () => {
        if(this.props.email && this.props.password){
            this.props.signupPress(this.props.navigation);
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
        <Button stylesContainer={styles.btnContainer} title="Sign Up" onPress={this.onButtonPress} />
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
        return (
            <KeyboardAwareScrollView style={styles.containers}>
                <SafeAreaView style={styles.screenContainer} />
                <View style={styles.viewContainer}>

                    {this.renderStatusBar()}
                    {this.renderInputs()}

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
    viewContainer: {
        flex: 1,
        justifyContent: 'center'
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

const mapStateToProps = ({ signupReducer }) => {
    const { email, password } = signupReducer;
    return { email, password };
};


export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    signupPress
})(SignupScreen);