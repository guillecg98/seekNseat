import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import { UserHomePage, UserProfileScreen } from '../screens';

export const UserStack = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    // { key: 'BOOKINGS', title: 'Reservas', icon: 'book' },
    { key: 'HOME', title: 'Home', icon: 'home' },
    { key: 'PROFILE', title: 'Perfil', icon: 'account-box' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    //BOOKINGS: ,
    HOME: UserHomePage,
    PROFILE: UserProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ padding: 7, backgroundColor: '#4b5173' }}
    />
  );
};
