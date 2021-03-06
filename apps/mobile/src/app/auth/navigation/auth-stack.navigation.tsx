import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import { BusinessHomePageScreen, BusinessRegisterScreen } from '../../business/screens';
import { SignInScreen } from '../screens';

const Stack = createStackNavigator();

export const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.NX_GOOGLE_AUTH_CLIENT_ID,
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Register" component={BusinessRegisterScreen} />
      <Stack.Screen name="Home" component={BusinessHomePageScreen} />
    </Stack.Navigator>
  );
};
