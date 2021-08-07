import { EditBusinessDTO } from '@seekNseat/contracts/business';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  activityIndicatorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  sectionHeader: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4884CA',
  },
  sectionForm: {
    flex: 6,
    justifyContent: 'center',
  },
  sectionFooter: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
});

export const BusinessProfileScreen = () => {
  const { logout } = useContext(AuthContext);
  const businessId = 'b6bf988a-f34e-4c4a-bdb6-aa3be8f580f3';
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
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>
            {' '}
            Business Profile {/* This should have style */}
          </Text>
          <SaveProfileButton onPress={onSaveProfile} />
        </View>

        <View style={styles.sectionForm}>
          <ScrollView>
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
          </ScrollView>
        </View>

        <View style={styles.sectionFooter}></View>
        <LogoutButton onPress={logout} />
      </View>
    );
  } else {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} size="large" color="#4884CA" />
      </View>
    );
  }
};
