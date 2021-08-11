import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../../auth/navigation';
import { ResquestBookingButton } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4884CA',
  },
  sectionForm: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export const UserProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>
          User Profile {/* This should have style */}
        </Text>
      </View>

      <View style={styles.sectionForm}>
        <Image
          style={styles.userImg}
          source={{
            uri: user.photo,
          }}
        />
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      <ResquestBookingButton onPress={logout} />
    </ScrollView>
  );
};
