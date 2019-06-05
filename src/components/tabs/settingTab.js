import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

class SettingTab extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("TabView")} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Setting Screen</Text>
            </TouchableOpacity>
        );
    }
}

export default SettingTab;