import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
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

interface IBookingData {
  foodies: number;
  time: Date;
}

const initialBookingData: IBookingData = {
  foodies: 1,
  time: new Date(),
};

export const AuthContext = createContext({
  bookingData: initialBookingData,
  setBookingData: undefined,
  user: initialUser,
  setUser: undefined,
  bearerToken: '',
  setBearerToken: undefined,
  login: () => {
    console.log('defaultValue');
  },
  logout: () => {
    console.log('defaultValue');
  },
});

export const AuthProvider: React.FC = ({ children }) => {
  const [bookingData, setBookingData] =
    useState<IBookingData>(initialBookingData);
  const [user, setUser] = useState<IUser>();
  const [bearerToken, setBearerToken] = useState('');

  return (
    <AuthContext.Provider
      value={{
        bookingData,
        setBookingData,
        user,
        setUser,
        bearerToken,
        setBearerToken,
        login: async () => {
          try {
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);

            const response = await axios.post(
              'http://localhost:3333/api/google-login',
              {
                token: googleCredential.token,
              }
            );
            setBearerToken(response.data.access_token);
            setUser(user);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              throw new Error('User canceled loggin');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              throw new Error('Play Services not available or outdated');
            } else {
              console.error(error);
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
