import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import { UserHomePageScreen } from '../../user/screens';
import { SignInScreen } from '../screens';

const Stack = createStackNavigator();

export const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '844656111334-uem0fq79h5qtd11uje1r6olquv53cssg.apps.googleusercontent.com'
      //webClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Home" component={UserHomePageScreen} />
    </Stack.Navigator>
  );
};
