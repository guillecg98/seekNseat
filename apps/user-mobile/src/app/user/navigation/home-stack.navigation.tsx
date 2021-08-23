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
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={UserHomePageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Businesses"
        component={BusinessesScreen}
        options={{
          headerTitle: 'Back to Home',
          headerStyle: {
            backgroundColor: '#0D8686',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="Business"
        component={BusinessScreen}
        options={{
          headerTitle: 'Back to Search',
          headerStyle: {
            backgroundColor: '#0D8686',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
};
