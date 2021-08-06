import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import {
  BusinessBookingsScreen,
  BusinessHomePageScreen,
  BusinessProfileScreen,
} from '../screens';

export const BusinessStack = () => {

  const [index,setIndex] = useState(1);
  const [routes] = useState([
    {key: 'BOOKINGS', title: 'Bookings', icon: 'book', color: '#4b5173'},
    {key: 'HOME', title: 'Home', icon: 'home', color: '#4b5173'},
    {key: 'PROFILE', title: 'Profile', icon: 'account-box', color: '#4b5173'},
  ])

  const renderScene = BottomNavigation.SceneMap({
    BOOKINGS: BusinessBookingsScreen,
    HOME: BusinessHomePageScreen,
    PROFILE: BusinessProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};