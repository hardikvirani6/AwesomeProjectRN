import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import { colors } from '../../redux/actions/const';

const Button = ({title, onPress, stylesContainer, styleText}) => {
    const {touchableElement, textButton} = buttonStyles;
    return (
        <TouchableOpacity style={stylesContainer ? stylesContainer : touchableElement} onPress={onPress}>
            <Text style={styleText ? styleText : textButton}>{title}</Text>
        </TouchableOpacity>
    );
};
const buttonStyles = {
    touchableElement: {
        backgroundColor: colors.primaryOrange,
        width: '50%',
        alignItems: 'center',
        marginHorizontal: 0,
        borderRadius: 8
    },
    textButton: {
        color: 'white',
        paddingVertical: 15,
        fontWeight: 'bold'
    }
};


export {Button};