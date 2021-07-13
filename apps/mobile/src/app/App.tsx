
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {Button, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import SafeAreaProvider from 'react-native-safe-area-context';

import ReservationButton from './components/reservation-button.component';
import { getBusinesses } from './requests/get-businesses.request';
import { getCategories } from './requests/get-categories.request';
import { getCountries } from './requests/get-countries-sample.request';
import { RegisterBusinessScreen, TypeOfUserScreen } from './screens';
import BusinessScreen from './screens/business.screen';

//const Stack = createStackNavigator();

export default function App() {

  const getBusinessesOnPressButton = () => {
    getCategories()
    .then( (res) => {
      console.log(res?.data)
    })
  }

  return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="register business" component={RegisterBusinessScreen} />
  //     </Stack.Navigator>
  // </NavigationContainer>
  <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
    <Button
      title="prueba api"
      onPress={getBusinessesOnPressButton} />
  </View>
  );
}