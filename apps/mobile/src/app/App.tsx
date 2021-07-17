import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  BusinessesScreen,
  BusinessHomePage,
  BusinessScreen,
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
        <Stack.Screen name="Businesses" component={BusinessesScreen} />
        <Stack.Screen name="BusinessHomePage" component={BusinessHomePage} />
        <Stack.Screen name="Initial" component={TypeOfUserScreen} />
        <Stack.Screen name="Register" component={RegisterBusinessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;