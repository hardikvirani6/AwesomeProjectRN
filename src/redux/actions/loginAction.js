import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_PRESS,
    LOGOUT_USER
} from '../actions/types';
import { showMessage } from '../../redux/actions/const';
import {NavigationActions, StackActions} from "react-navigation";
import _ from 'lodash';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const logOutUser = (navigation) => {
    return async (dispatch, getState) => {
        await AsyncStorage.removeItem("loginData");
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'LoginScreen'})],
        });
        navigation.dispatch(resetAction);

        showMessage("User Logout!");

        dispatch({
            type: LOGOUT_USER
        })
    }
};

export const loginPress = (navigation) => {
    return async (dispatch, getState) => {
        let email = getState().loginReducer.email;
        let password = getState().loginReducer.password;

        let userData = await AsyncStorage.getItem("userData");

        if(userData){
            let item = [];
            item = JSON.parse(userData);

            if(_.find(item, {email: email, password: password})) {
                showMessage("User Login Success!");

                await AsyncStorage.setItem("loginData", JSON.stringify({email: email, password: password}));
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'TabView' })],
                });
                navigation.dispatch(resetAction);

            }
            else{
                showMessage("Authentication Failed!");
            }
        }
        else{
            showMessage("User not available!");
        }

        dispatch({
            type: LOGIN_PRESS
        })
    }
};