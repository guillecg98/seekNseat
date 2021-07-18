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
  TypeOfUserScreen
} from './screens';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{
            headerShown: false,
          }}>
        <Stack.Screen name="Business" component={BusinessScreen} />
        <Stack.Screen name="BusinessHomePage" component={BusinessHomePage} />
        <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
        <Stack.Screen name="BusinessReservations" component={BusinessReservationsScreen} />
        <Stack.Screen name="BusinessSchedules" component={BusinessSchedulesScreen} />
        <Stack.Screen name="Businesses" component={BusinessesScreen} />
        <Stack.Screen name="Instructions" component={Instructions} />
        <Stack.Screen name="Register" component={RegisterBusinessScreen} />
        <Stack.Screen name="Initial" component={TypeOfUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;