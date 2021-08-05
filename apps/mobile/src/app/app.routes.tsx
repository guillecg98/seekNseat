import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';

import { AuthContext, AuthStack } from './auth/navigation';
import { BusinessStack } from './business/navigation';

export const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AuthStack /> : <BusinessStack /> }
    </NavigationContainer>
  );
};
