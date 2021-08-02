import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';


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
});

export const SignInScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '162567883506-lj0jl93ak719a81vv1qctu3ksamckvij.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Button
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with google')
            )
          }
          title="Google SignIn"
        />
      </View>
    </View>
  );
};
