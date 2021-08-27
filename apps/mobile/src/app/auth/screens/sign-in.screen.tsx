import { BusinessDTO } from '@seekNseat/contracts/business';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { getBusinesses } from '../../business/requests/queries/get-businesses.request';
import { SocialButton } from '../components';
import { AuthContext } from '../navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC074',
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
    color: '#2b2b2b',
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
      <Text style={[styles.text, { marginTop: 20 }]}> Bienvenido a</Text>
      <Text style={styles.text}> Seek N Seat Restaurants</Text>
      <View style={styles.sectionContainer}>
        <Image
          source={require('../../assets/retaurant-logo.png')}
          style={styles.logo}
        />
        <SocialButton
          buttonTitle="Inicia sesión con Google"
          buttonType="google"
          color="#FFC074"
          backgroundColor="#2b2b2b"
          onPress={onSignIn}
        />
      </View>
    </View>
  );
};
