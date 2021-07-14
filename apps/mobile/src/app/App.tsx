import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Button, Text, View} from 'react-native';

import { ReservationButton } from './components';
import { BusinessesScreen, BusinessScreen, RegisterBusinessScreen, TypeOfUserScreen } from './screens';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="Initial" component={TypeOfUserScreen} />
        <Stack.Screen name="Register" component={RegisterBusinessScreen} />
        <Stack.Screen name="Businesses" component={BusinessesScreen} />
        <Stack.Screen name="Business" component={BusinessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;