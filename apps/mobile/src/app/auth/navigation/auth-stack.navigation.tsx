import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { SignInScreen } from '../screens';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  )
}