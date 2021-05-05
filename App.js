import { Dimensions, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import LandingPage from './components/LandingPage';
import AddEntryPage from './components/AddEntryPage';
import CategoryPage from './components/CategoryPage';
import ViewEntryPage from './components/ViewEntryPage';
import ViewCategoryPage from './components/ViewCategoryPage';

MaterialIcons.loadFont();
FontAwesomeIcons.loadFont();

const d = Dimensions.get("window");
const isX = Platform.OS === "ios" && (d.height > 800 || d.width > 800) ? true : false;

const CategoryNavigation = createStackNavigator({
    Category: { screen: CategoryPage },
    ViewCategory: { screen: ViewCategoryPage },
    ViewEntry: { screen: ViewEntryPage }
});

const AddEntryNavigation = createStackNavigator({
    AddEntry: { screen: AddEntryPage }
});

const TabNavigator = createMaterialTopTabNavigator({
    Cat: CategoryNavigation,
    Add: AddEntryNavigation,
}, {
    tabBarOptions: {
        style: {
            paddingTop: Platform.OS === "ios" && isX ? 40 : 0,
            backgroundColor: '#acd300'
        }
    }
});

const StackNavigation = createStackNavigator({
    Landing: {
        screen: LandingPage
    },
    Home: {
        screen: TabNavigator
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            height: 0
        },
        headerLeft: () => null,
        headerTitle: () => null
    }
});

export default createAppContainer(StackNavigation);