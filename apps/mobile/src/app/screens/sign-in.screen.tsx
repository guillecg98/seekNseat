import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SocialButton } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  sectionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
});

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

export const SignInScreen = () => {
  const [logged, setLogged] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>(initialUser);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '844656111334-uem0fq79h5qtd11uje1r6olquv53cssg.apps.googleusercontent.com', //process.env not working
    });
  }, []);

  const googleLogin = async () => {
    try {
      const { idToken, user } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setUserInfo(user);
      setLogged(true);
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
  };

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLogged(false);
    } catch (error) {
      console.error(error);
    }
  };

  return logged ? (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>
          {' '}
          Welcome {userInfo.name}! You are logged in!
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <SocialButton
          buttonTitle="Logout"
          buttonType="google"
          color="#b81622"
          backgroundColor="#e3afb3"
          onPress={logout}
        />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <SocialButton
          buttonTitle="Sign In with Google"
          buttonType="google"
          color="#59a4de"
          backgroundColor="#cad7e0"
          onPress={googleLogin}
        />
      </View>
    </View>
  );
};
