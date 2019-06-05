import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import {
    SIGNUP_EMAIL_CHANGED,
    SIGNUP_PASSWORD_CHANGED,
    SIGNUP_PRESS
} from '../actions/types';
import { showMessage } from '../../redux/actions/const';
import {NavigationActions, StackActions} from 'react-navigation';

export const emailChanged = (text) => {
    return {
        type: SIGNUP_EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: SIGNUP_PASSWORD_CHANGED,
        payload: text
    };
};

export const signupPress = (navigation) => {
    return async (dispatch, getState) => {
        let email = getState().signupReducer.email;
        let password = getState().signupReducer.password;

        let obj = { email: email, password: password };
        let userData = await AsyncStorage.getItem("userData");
        if(userData){
            let item = [];
            item = JSON.parse(userData);
            item.push(obj);
            await AsyncStorage.setItem("loginData", JSON.stringify(obj));
            await AsyncStorage.setItem("userData", JSON.stringify(item));
            showMessage("User Created!");

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'TabView' })],
            });
            navigation.dispatch(resetAction);

        }
        else{
            userData = [];
            userData.push(obj);
            await AsyncStorage.setItem("loginData", JSON.stringify(obj));
            await AsyncStorage.setItem("userData", JSON.stringify(userData));
            showMessage("User Created!");

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'TabView' })],
            });
            navigation.dispatch(resetAction);
        }

        dispatch({
            type: SIGNUP_PRESS
        })
    }
};