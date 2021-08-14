import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SocialButton } from '../components';
import { AuthContext } from '../navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D8686',
  },
  logo: {
    width: 200,
    height: 180,
    resizeMode: 'contain',
  },
  sectionContainer: {
    flex: 2,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 34,
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#cad7e0',
  },
});

export const SignInScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  const onSignIn = () => {
    login();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {marginTop: 20,}]}> Bienvenido a</Text>
      <Text style={styles.text}> Seek N Seat</Text>
      <View style={styles.sectionContainer}>
      <Image
        source={require('../../assets/restaurant-white-logo.png')}
        style={styles.logo}
      />
        <SocialButton
          buttonTitle="Inicia sesión con Google"
          buttonType="google"
          color="#0D8686"
          backgroundColor="#cad7e0"
          onPress={onSignIn}
        />
      </View>
    </View>
  );
};
