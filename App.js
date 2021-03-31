import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import AddEntryPage from './components/AddEntryPage';
import CategoryPage from './components/CategoryPage';
import ViewEntryPage from './components/ViewEntryPage';
import ViewCategoryPage from './components/ViewCategoryPage';

const StackNavigation = createStackNavigator({
  Category: { screen: CategoryPage },
  ViewCategory: { screen: ViewCategoryPage },
  ViewEntry: { screen: ViewEntryPage }
});

const AddEntryNavigation = createStackNavigator({
  AddEntry: { screen: AddEntryPage }
});

const TabNavigator = createMaterialTopTabNavigator({
  Cat: StackNavigation,
  Add: AddEntryNavigation,
});

export default createAppContainer(TabNavigator);