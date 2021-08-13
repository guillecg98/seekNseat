import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  BusinessesScreen,
  BusinessScreen,
  UserHomePageScreen,
} from '../screens';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={UserHomePageScreen} />
      <Stack.Screen name="Businesses" component={BusinessesScreen} />
      <Stack.Screen name="Business" component={BusinessScreen} />
    </Stack.Navigator>
  );
};
