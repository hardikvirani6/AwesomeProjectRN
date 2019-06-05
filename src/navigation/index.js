import React from "react";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../components/login';
import SignupScreen from '../components/register';
import HomeTab from '../components/tabs/homeTab';
import CartTab from '../components/tabs/cartTab';
import ActivityTab from '../components/tabs/activityTab';
import SettingTab from '../components/tabs/settingTab';

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeTab
    },
    Cart: {
        screen: CartTab
    },
    Activity: {
        screen: ActivityTab
    },
    Settings: {
        screen: SettingTab
    },
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Cart') {
                    iconName = `ios-notifications`;
                } else if (routeName === 'Activity') {
                    iconName = `ios-log-out`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    });

const AppNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen
    },
    SignupScreen: {
        screen: SignupScreen
    },
    TabView: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    }
},{ headerLayoutPreset: 'center' });

export default createAppContainer(AppNavigator);