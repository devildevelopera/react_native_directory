import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';


import LandingPage from './components/LandingPage';
import AddEntryPage from './components/AddEntryPage';
import CategoryPage from './components/CategoryPage';
import ViewEntryPage from './components/ViewEntryPage';
import ViewCategoryPage from './components/ViewCategoryPage';

Ionicons.loadFont();
MaterialIcons.loadFont();
AntDesignIcons.loadFont();
FontAwesomeIcons.loadFont();

const d = Dimensions.get("window");
const isX = Platform.OS === "ios" && (d.height > 800 || d.width > 800) ? true : false;

const CategoryNavigation = createStackNavigator({
    Category: { screen: CategoryPage },
    ViewEntry: { screen: ViewEntryPage },
    ViewCategory: { screen: ViewCategoryPage }
});

const AddEntryNavigation = createStackNavigator({
    AddEntry: { screen: AddEntryPage }
});

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: LandingPage,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: () => (
                <Ionicons size={25}
                    color='#fff'
                    name="home-outline" />
            ),
            tabBarVisible: false
        },
    },
    Cat: {
        screen: CategoryNavigation,
        navigationOptions: {
            tabBarLabel: 'View All',
            tabBarIcon: () => (
                <Ionicons size={25}
                    name="menu"
                    color='#fff' />
            )
        }
    },
    Add: {
        screen: AddEntryNavigation,
        navigationOptions: {
            tabBarLabel: 'Sign Up',
            tabBarIcon: () => (
                <AntDesignIcons size={25}
                    color='#fff'
                    name="adduser" />
            )
        }
    },
    Update: {
        screen: AddEntryNavigation,
        navigationOptions: {
            tabBarLabel: 'Update',
            tabBarIcon: () => (
                <MaterialIcons size={25}
                    color='#fff'
                    name="update" />
            )
        }
    },
    Back: {
        screen: LandingPage,
        navigationOptions: {
            tabBarLabel: 'Back',
            tabBarIcon: () => (
                <Ionicons size={25}
                    color='#fff'
                    name="arrow-undo-outline" />
            ),
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                navigation.goBack(null);
            }
        }
    }
}, {
    tabBarOptions: {
        style: {
            height: isX? 50 : 60,
            backgroundColor: '#acd300'
        },
        labelStyle: {
            fontSize: 15,
            color: '#333'
        },
        tabStyle: {
            paddingVertical: 5,
            borderColor: '#fff',
            borderLeftWidth: 0.5,
            marginBottom: isX ? -10 : 0
        }
    }
});

// const StackNavigation = createStackNavigator({
//     Landing: {
//         screen: LandingPage
//     },
//     Home: {
//         screen: TabNavigator
//     },
// }, {
//     defaultNavigationOptions: {
//         headerStyle: {
//             height: 0
//         },
//         headerLeft: () => null,
//         headerTitle: () => null
//     }
// });

export default createAppContainer(TabNavigator);