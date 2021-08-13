import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { createContext, useState } from 'react';

interface IUser {
  id: string;
  name: string;
  email: string;
  photo: string;
  familyName: string;
  givenName: string;
}

const initialUser: IUser = {
  id: '',
  name: '',
  email: '',
  photo: '',
  familyName: '',
  givenName: '',
};

export const AuthContext = createContext({
  user: initialUser,
  setUser: undefined,
  login: () => {
    console.log('defaultValue');
  },
  logout: () => {
    console.log('defaultValue');
  },
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async () => {
          try {
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            setUser(user);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        },
        logout: async () => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser(null);
          } catch (error) {
            console.error(error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
