import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext, AuthStack } from './auth/navigation';
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
  UserProfileScreen,
} from './screens';

const Stack = createStackNavigator();

const App = () => {
  // const { user, setUser } = useContext(AuthContext);
  // const [initializing, setInitializing] = useState(true);

  // const onAuthStateChanged = (user) => {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  return (
    <NavigationContainer>


<Stack.Navigator
          initialRouteName="UserProfile"
          screenOptions={{
            headerShown: false,
          }}
        >
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
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </Stack.Navigator>

      {/* {user ? (
        <Stack.Navigator
          initialRouteName="Initial"
          screenOptions={{
            headerShown: false,
          }}
        >
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
      ) : (
        <AuthStack />
      )} */}
    </NavigationContainer>
  );
};

export default App;
