import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';

import { AuthContext, AuthStack } from './auth/navigation';
import { UserStack } from './user/navigation';

export const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <UserStack />
    </NavigationContainer>
  );
};
