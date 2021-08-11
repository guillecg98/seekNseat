import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import { SignInScreen } from '../screens';

const Stack = createStackNavigator();

export const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '844656111334-uem0fq79h5qtd11uje1r6olquv53cssg.apps.googleusercontent.com', //process.env not working
    });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName='SignIn'>
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};
