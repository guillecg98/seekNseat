import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';

import { AppStack } from './app-stack.navigation';
import { AuthContext, AuthStack } from './auth/navigation';

export const AppRoutes = () => {
  const { user, owner } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user && owner ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
