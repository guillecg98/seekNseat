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

export const AuthContext = createContext({
  bearerToken: '',
  setBearerToken: undefined,
  businessId: '',
  setBusinessId: undefined,
  owner: false,
  setOwner: undefined,
  ownerId: '',
  setOwnerId: undefined,
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
  const [bearerToken, setBearerToken] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [owner, setOwner] = useState(false);
  const [ownerId, setOwnerId] = useState('')
  const [user, setUser] = useState<IUser>();

  return (
    <AuthContext.Provider
      value={{
        bearerToken,
        setBearerToken,
        businessId,
        setBusinessId,
        owner,
        setOwner,
        ownerId,
        setOwnerId,
        user,
        setUser,
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
            setOwnerId(response.data.id);
            setUser(user);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              throw new Error('User canceled loggin');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              throw new Error('Play Services not available or outdated');
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
