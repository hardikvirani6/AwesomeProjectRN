import React, { Component } from 'react';
import {
    ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast';

export const showMessage = (text) => {
    Toast.show(text);
};

export const showLoader = () => {
    return(
        <ActivityIndicator size="large" color="#0000ff" />
    )
};

export const colors = {
    primaryOrange: 'rgb(234, 98, 80)',
    primaryGreen: 'rgb(57, 192, 111)',
    darkGrey: '#c9cacc',
    lightGrey: '#eaeaea',
    primaryBlue: '#00a9e8',
    primaryGrey: '#999999',
    primaryBlack: '#282c36',
    mainBackground: '#f2f5f9',
    lightBlue: '#ADD8E6',
    white: '#FFFFFF'
};

