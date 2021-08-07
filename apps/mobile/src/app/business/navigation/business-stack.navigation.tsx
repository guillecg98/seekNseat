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
    {key: 'BOOKINGS', title: 'Reservas', icon: 'book'},
    {key: 'HOME', title: 'Home', icon: 'home'},
    {key: 'PROFILE', title: 'Perfil', icon: 'account-box'},
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
      barStyle={{padding: 7, backgroundColor: '#4b5173'}}
    />
  );
};