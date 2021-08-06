import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  BusinessBookingsScreen,
  BusinessHomePageScreen,
  BusinessProfileScreen,
} from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const BusinessStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BusinessHomePageScreen}
        options={{
          headerShown: false,
        }}
        // options={() => ({
        //   tabBarLabel: 'Home',
        //   tabBarIcon: ({ color, size }) => (
        //     <MaterialCommunityIcons
        //       name="home-outline"
        //       color={color}
        //       size={size}
        //     />
        //   ),
        // })}
      />
      <Stack.Screen
        name="Bookings"
        component={BusinessBookingsScreen}
        // options={() => ({
        //   tabBarIcon: ({ color, size }) => (
        //     <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
        //   ),
        // })}
      />
      <Stack.Screen
        name="Profile"
        component={BusinessProfileScreen}
        // options={{
        //   tabBarIcon: ({ color, size }) => (
        //     <Ionicons name="person-outline" color={color} size={size} />
        //   ),
        // }}
      />
    </Stack.Navigator>
  );
};
