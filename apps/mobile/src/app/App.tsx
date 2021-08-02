import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  BusinessesScreen,
  BusinessHomePage,
  BusinessProfileScreen,
  BusinessReservationsScreen,
  BusinessSchedulesScreen,
  BusinessScreen,
  Instructions,
  RegisterBusinessScreen,
  TypeOfUserScreen,
  UserHomePage,
} from './screens';
import { SignInScreen } from './screens/sign-in.screen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Signin" component={SignInScreen} />
        <Stack.Screen name="Business" component={BusinessScreen} />
        <Stack.Screen name="BusinessHomePage" component={BusinessHomePage} />
        <Stack.Screen
          name="BusinessProfile"
          component={BusinessProfileScreen}
        />
        <Stack.Screen
          name="BusinessReservations"
          component={BusinessReservationsScreen}
        />
        <Stack.Screen
          name="BusinessSchedules"
          component={BusinessSchedulesScreen}
        />
        <Stack.Screen name="Businesses" component={BusinessesScreen} />
        <Stack.Screen name="Instructions" component={Instructions} />
        <Stack.Screen name="Register" component={RegisterBusinessScreen} />
        <Stack.Screen name="Initial" component={TypeOfUserScreen} />
        <Stack.Screen name="UserHomePage" component={UserHomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
