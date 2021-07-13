import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Button, Text, View} from 'react-native';

import { RegisterBusinessScreen, TypeOfUserScreen } from './screens';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Home Screen</Text>
    <Button
      title="to register"
      onPress={() => navigation.navigate('Register')}/>
  </View>
  )
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterBusinessScreen} />
        <Stack.Screen name="Initial" component={TypeOfUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <HomeScreen />
  );
}

export default App;