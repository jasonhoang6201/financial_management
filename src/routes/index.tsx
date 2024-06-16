import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import BucketList from '@src/screens/bucket-list';
import * as React from 'react';
import CustomTabBar from './custom-tab-bar';
import FinancialManagement from '@src/screens/financial-management';

const Tab = createBottomTabNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="Tracking" component={FinancialManagement} />
        <Tab.Screen name="Bucket" component={BucketList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;
