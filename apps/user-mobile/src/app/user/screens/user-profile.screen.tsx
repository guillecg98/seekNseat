import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { LogoutButton } from '../../auth/components';
import { AuthContext } from '../../auth/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0D8686',
    padding: 30,
    height: 160,
  },
  title: {
    textAlign: 'left',
    fontSize: 30,
    color: 'white',
  },
  userImg: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 4,
    top: -50,
    borderColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
  },
  bodyContent: {
    flex: 6,
    padding: 5,
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#494949',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#494949',
    margin: 10,
  }
});

export const UserProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Profile</Text>
      </View>

      <View style={{ flexGrow: 1, alignItems: 'center' }}>
        <Image
          style={styles.userImg}
          source={{
            uri: user.photo,
          }}
        />
      </View>

      <View style={styles.bodyContent}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.text}> email: {user.email}</Text>
        <Text style={styles.text}> givenName: {user.givenName}</Text>
        <Text style={styles.text}> famName: {user.familyName}</Text>
      </View>

      <LogoutButton onPress={logout} />
    </View>
  );
};
