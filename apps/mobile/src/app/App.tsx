import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import InitialScreen from './screens/initial-screen';
import Instructions from './screens/nx-rn-instructions.screen';

const Stack = createStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    <InitialScreen />
      // </NavigationContainer>
  );
}
export default App;
