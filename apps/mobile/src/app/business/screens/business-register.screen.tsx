import 'react-native-get-random-values';

import { BusinessDTO } from '@seekNseat/contracts/business';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Image, Input } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';

import { AuthContext } from '../../auth/navigation';
import { PublishBusinessButton } from '../components';
import { createBusiness } from '../requests';
import { getBusinesses } from '../requests/queries/get-businesses.request';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  headerSection: {
    flex: 1.5,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
  section: {
    flex: 3,
    padding: 15,
    justifyContent: 'space-evenly',
  },
  textIntro: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2b2b2b',
    textAlign: 'center',
  },
  dropdown: {
    margin: 10,
    borderBottomColor: '#FFC074',
    borderBottomWidth: 2,
    height: 45,
  },
  sectionFooter: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  activityIndicatorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
const data = [
  { label: 'Indio', value: 'indio' },
  { label: 'Chino', value: 'chino' },
  { label: 'Mexicano', value: 'mexicano' },
  { label: 'Fast-food', value: 'fast-food' },
  { label: 'Vegetariano', value: 'vegetariano' },
  { label: 'Americano', value: 'americano' },
  { label: 'Italiano', value: 'italiano' },
  { label: 'Japonés', value: 'japones' },
  { label: 'Mediterránea', value: 'mediterranea' },
];

const NameInput = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <Input
      containerStyle={{ marginTop: 15 }}
      inputContainerStyle={{
        borderBottomWidth: 2,
        borderBottomColor: '#FFC074',
      }}
      label="Nombre del restaurante"
      labelStyle={{ color: '#2b2b2b' }}
      placeholder="nombre"
      value={field.value}
      onChangeText={field.onChange}
    />
  );
};

const ContactPhoneInput = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <Input
      containerStyle={{ marginTop: 15 }}
      inputContainerStyle={{
        borderBottomWidth: 2,
        borderBottomColor: '#FFC074',
      }}
      label="Teléfono de contacto"
      labelStyle={{ color: '#2b2b2b' }}
      placeholder="teléfono"
      value={field.value}
      onChangeText={field.onChange}
      keyboardType="numeric"
    />
  );
};

export const BusinessRegisterScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const { bearerToken, businessId, setBusinessId, setOwner, ownerId, user } =
    useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState<BusinessDTO[]>();

  useEffect(() => {
    if (bearerToken) {
      getBusinesses(bearerToken).then((res) => {
        setBusinesses(res?.data);
      });
    }
  }, [bearerToken]);

  const onPublishBusiness = (inputData) => {
    const id = uuidv4();
    createBusiness(
      id,
      ownerId,
      inputData.name,
      inputData.contactPhone,
      categories,
      bearerToken
    ).then((res) => console.log(res.data));
    setBusinessId(id);
    setOwner(true);
  };

  if (!businesses) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} size="large" color="#FFC074" />
      </View>
    );
  }

  if (businesses.some((business) => business.ownerId === ownerId)) {
    const business = businesses.find(
      (business) => business.ownerId === ownerId
    );
    setBusinessId(business._id);
    setOwner(true);
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.textIntro}>
            {' '}
            Bienvenido, {user ? user.givenName : null}!{' '}
          </Text>
          <Text
            style={{
              color: '#2b2b2b',
              textAlign: 'center',
              fontSize: 18,
              marginTop: 20,
            }}
          >
            {' '}
            ... para empezar ayúdanos con algunos datos básicos
          </Text>
        </View>

        <View style={styles.section}>
          <MultiSelect
            style={styles.dropdown}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Añade categorías"
            placeholderStyle={{ fontSize: 18 }}
            search
            searchPlaceholder="Buscar"
            value={categories}
            onChange={(item) => {
              setCategories(item);
            }}
          />
          <NameInput name="name" control={control} />
          <ContactPhoneInput name="contactPhone" control={control} />
        </View>

        <View style={styles.sectionFooter}>
          <PublishBusinessButton onPress={handleSubmit(onPublishBusiness)} />
        </View>
      </View>
    );
  }
};
