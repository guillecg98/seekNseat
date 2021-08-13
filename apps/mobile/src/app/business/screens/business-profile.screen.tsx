import { EditBusinessDTO } from '@seekNseat/contracts/business';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Input } from 'react-native-elements';

import { LogoutButton } from '../../auth/components';
import { AuthContext } from '../../auth/navigation';
import { SaveProfileButton } from '../components';
import { editBusinessProfile, getBusiness } from '../requests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleHeader: {
    padding: 10,
    marginTop: 15,
    justifyContent: 'center',
  },
  header: {
    padding: 10,
    justifyContent: 'center',
  },
  headerContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#212424',
  },
  userImg: {
    marginRight: 20,
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  sectionForm: {
    marginTop: 10,
    justifyContent: 'center',
  },
  sectionFooter: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  activityIndicatorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export const BusinessProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const businessId = 'df6271d8-fe57-4d46-b7a7-2961373f6021';
  const [businessToEdit, setBusinessToEdit] = useState<EditBusinessDTO>();

  useEffect(() => {
    getBusiness(businessId).then((res) => {
      setBusinessToEdit(res?.data);
    });
  }, []);

  const onSaveProfile = () => {
    if (businessToEdit) {
      editBusinessProfile(businessId, businessToEdit).then((res) =>
        console.log(res?.data)
      );
    } else {
      console.log('Business undefined');
    }
  };

  if (businessToEdit) {
    return (
      <View style={styles.container}>
        <View style={styles.titleHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Business Profile</Text>
            <SaveProfileButton onPress={onSaveProfile} />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Owner Info </Text>
          <View style={styles.headerContent}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              Account email:
            </Text>
            <Image
              style={styles.userImg}
              source={{
                uri: user.photo,
              }}
            />
          </View>

          <View style={styles.headerContent}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {' '}
              {user.email}{' '}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {' '}
              {user.name}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.sectionForm}>
          <ScrollView>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {' '}
              Business Info{' '}
            </Text>
            <Input
              label="Name"
              placeholder="Business name"
              value={businessToEdit.name}
              onChangeText={(newName: string) =>
                setBusinessToEdit({
                  ...businessToEdit,
                  name: newName,
                })
              }
            />

            <Input
              label="Contact Phone"
              placeholder="Business contact phone"
              keyboardType="numeric"
              value={businessToEdit.contactPhone}
              onChangeText={(newContactPhone: string) =>
                setBusinessToEdit({
                  ...businessToEdit,
                  contactPhone: newContactPhone,
                })
              }
            />

            <Input
              label="Address"
              placeholder="Business address"
              value={businessToEdit.address}
              onChangeText={(newAddress: string) =>
                setBusinessToEdit({
                  ...businessToEdit,
                  address: newAddress,
                })
              }
            />

            <Input
              label="Description"
              placeholder="Business description"
              value={businessToEdit.description}
              onChangeText={(newDescription: string) =>
                setBusinessToEdit({
                  ...businessToEdit,
                  description: newDescription,
                })
              }
            />
            <LogoutButton onPress={logout} />
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} size="large" color="#FFC074" />
      </View>
    );
  }
};
