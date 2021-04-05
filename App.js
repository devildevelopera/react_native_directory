import { Dimensions, Platform } from 'react-native'; 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import AddEntryPage from './components/AddEntryPage';
import CategoryPage from './components/CategoryPage';
import ViewEntryPage from './components/ViewEntryPage';
import ViewCategoryPage from './components/ViewCategoryPage';

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
  },{
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "ios" && isX ? 40 : 0,
      }
    }
  });

export default createAppContainer(TabNavigator);