import React from 'react';

import { AppRoutes } from "./app.routes";
import { AuthProvider } from "./auth/navigation";

export const AppProviders = () => {
  return(
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  );
}