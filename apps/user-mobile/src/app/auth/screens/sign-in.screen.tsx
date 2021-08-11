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
  const { login } = useContext(AuthContext);

  const onSignIn = () => {
    login();
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <SocialButton
          buttonTitle="Sign In with Google"
          buttonType="google"
          color="#59a4de"
          backgroundColor="#cad7e0"
          onPress={onSignIn}
        />
      </View>
    </View>
  );
};
