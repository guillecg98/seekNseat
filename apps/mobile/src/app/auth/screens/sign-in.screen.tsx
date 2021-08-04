import { GoogleSignin } from '@react-native-google-signin/google-signin';
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

export const SignInScreen = () => {

  const { socialLogin } = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '844656111334-uem0fq79h5qtd11uje1r6olquv53cssg.apps.googleusercontent.com', //process.env not working
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <SocialButton
          buttonTitle="Sign In with Google"
          buttonType="google"
          color="#59a4de"
          backgroundColor="#cad7e0"
          onPress={() => socialLogin()}
        />
      </View>
    </View>
  );
};
