import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import { BusinessBookingsScreen } from './booking/screens';
import {
  BusinessHomePageScreen,
  BusinessProfileScreen,
} from './business/screens';

export const AppStack = () => {
  const [index, setIndex] = useState(2);
  const [routes] = useState([
    { key: 'BOOKINGS', title: 'Reservas', icon: 'book' },
    { key: 'HOME', title: 'Home', icon: 'home' },
    { key: 'PROFILE', title: 'Perfil', icon: 'account-box' },
  ]);

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
      barStyle={{ padding: 7, backgroundColor: '#FFC074' }}
    />
  );
};