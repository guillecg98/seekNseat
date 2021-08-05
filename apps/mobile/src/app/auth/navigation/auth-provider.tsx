import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IUser {
  name: string;
  id: string;
  givenName: string;
  familyName: string;
  photo: string; // url
}

const initialUser: IUser = {
  name: '',
  id: '',
  givenName: '',
  familyName: '',
  photo: '',
};

interface IAuthContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const initialAuthContext: IAuthContext = {
  user: initialUser,
  setUser: (user: IUser) => {},
}

export const AuthContext = createContext(initialAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        // login: async () => {
        //   try {
        //     const { idToken } = await GoogleSignin.signIn();
        //     const googleCredential =
        //       auth.GoogleAuthProvider.credential(idToken);
        //     await auth().signInWithCredential(googleCredential);
        //   } catch (error) {
        //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //       // user cancelled the login flow
        //     } else if (error.code === statusCodes.IN_PROGRESS) {
        //       // operation (e.g. sign in) is in progress already
        //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //       // play services not available or outdated
        //     } else {
        //       // some other error happened
        //     }
        //   }
        // },
        // logout: async () => {
        //   try {
        //     await GoogleSignin.revokeAccess();
        //     await GoogleSignin.signOut();
        //   } catch (error) {
        //     console.error(error);
        //   }
        // },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
