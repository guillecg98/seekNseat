import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { SocialButton } from '../components';
import { AuthContext } from '../navigation';

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

export const SignInScreen = ({ navigation }) => {
  //const { socialLogin } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);

  const onSignIn = () => {
    login();
    navigation.navigate('Initial');
  };

  const login = async () => {
    try {
      const { idToken, user } = await GoogleSignin.signIn();
      setUser(user);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
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

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <SocialButton
          buttonTitle="Sign In with Google"
          buttonType="google"
          color="#59a4de"
          backgroundColor="#cad7e0"
          // onPress={() => login()}
          onPress={onSignIn}
        />
      </View>
    </View>
  );
};
