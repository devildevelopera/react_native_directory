import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import styles from './styles/Styles';
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

const TabNavigator = createMaterialTopTabNavigator(
  {
    Cat: CategoryNavigation,
    Add: AddEntryNavigation,
  }, {
  tabBarOptions: {
    style: {
      paddingTop: Platform.OS === "ios" && isX ? 40 : 0,
    }
  }
});

class LandingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Image source={require('./assets/logo.png')} style={{ alignSelf: 'center', marginTop: '30%' }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '20%' }}>
          <TouchableOpacity
            title="Category View"
            style={styles.TouchableOpacityStyle}
            onPress={() => this.props.navigation.navigate('Category')}>
            <Text style={styles.TextStyle}> Category View </Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Add New Entry"
            style={styles.TouchableOpacityStyle}
            onPress={() => this.props.navigation.navigate('AddEntry')}>
            <Text style={styles.TextStyle}> Add New Entry </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const StackNavigation = createStackNavigator({
  Landing: {
    screen: LandingScreen
  },
  Home: {
    screen: TabNavigator
  },
}, {
  headerMode: 'none'
});

export default createAppContainer(StackNavigation);