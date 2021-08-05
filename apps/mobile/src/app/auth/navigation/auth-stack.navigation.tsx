import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import { BusinessRegisterScreen } from '../../business/screens';
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
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="BusinessRegister"
        component={BusinessRegisterScreen}
      />
    </Stack.Navigator>
  );
};
