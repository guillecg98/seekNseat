import { EditBusinessDTO } from '@seekNseat/contracts/business';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Input } from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import { Divider } from 'react-native-paper';

import { LogoutButton } from '../../auth/components';
import { AuthContext } from '../../auth/navigation';
import { DemoButton, DemoResponse, SaveProfileButton } from '../components';
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
    marginTop: 5,
    margin: 10,
  },
  dropdown: {
    margin: 10,
    borderBottomColor: '#969696',
    borderBottomWidth: 2,
    height: 45,
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

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

const actions: Action[] = [
  {
    title: 'Tomar Foto',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Abrir Galería',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
];

export const BusinessProfileScreen = () => {
  const [showContent, setShowContent] = useState(true);
  const [categories, setCategories] = useState([]);
  const [businessToEdit, setBusinessToEdit] = useState<EditBusinessDTO>();
  const { bearerToken, businessId, user, logout } = useContext(AuthContext);
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    getBusiness(businessId, bearerToken).then((res) => {
      setBusinessToEdit(res?.data);
      setCategories(res.data.categories);
    });
  }, []);

  const onUploadImage = useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setImage);
    } else {
      ImagePicker.launchImageLibrary(options, setImage);
    }
  }, []);

  const onSaveProfile = () => {
    if (businessToEdit) {
      editBusinessProfile(businessId, businessToEdit, bearerToken).then((res) =>
        console.log(res?.data)
      );
      setShowContent(false);
      setTimeout(() => {
        setShowContent(true);
      }, 1300);
    } else {
      console.log('Business undefined');
    }
  };

  return businessToEdit && showContent ? (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.title}> Perfil </Text>
          <SaveProfileButton onPress={onSaveProfile} />
        </View>
      </View>
      <Divider />
      <View style={styles.header}>
        <Text style={{ color: '#616161', fontSize: 20, fontWeight: 'bold' }}>
          {' '}
          Información del usuario{' '}
        </Text>
        <View style={styles.headerContent}>
          <Text
            style={{
              color: '#616161',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            Email:
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
              color: '#616161',
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
              color: '#616161',
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

      <Divider />
      <ScrollView
        style={styles.sectionForm}
        contentContainerStyle={{ justifyContent: 'center' }}
      >
        <ScrollView>
          <Text style={{ color: '#616161', fontSize: 20, fontWeight: 'bold' }}>
            {' '}
            Información del restaurante{' '}
          </Text>

          <MultiSelect
            style={styles.dropdown}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Categorías"
            placeholderStyle={{ fontSize: 18 }}
            search
            searchPlaceholder="Buscar"
            value={categories}
            onChange={(item) => {
              setCategories(item);
              setBusinessToEdit({
                ...businessToEdit,
                categories: item,
              });
            }}
          />

          <Input
            containerStyle={{ marginTop: 15 }}
            label="Nombre del restaurante"
            labelStyle={{ color: '#616161' }}
            placeholder="nombre"
            value={businessToEdit.name}
            onChangeText={(newName: string) =>
              setBusinessToEdit({
                ...businessToEdit,
                name: newName,
              })
            }
          />

          <Input
            label="Teléfono de contacto"
            labelStyle={{ color: '#616161' }}
            placeholder="teléfono"
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
            label="Dirección"
            labelStyle={{ color: '#616161' }}
            placeholder="dirección"
            value={businessToEdit.address}
            onChangeText={(newAddress: string) =>
              setBusinessToEdit({
                ...businessToEdit,
                address: newAddress,
              })
            }
          />

          <Input
            label="Descripción"
            labelStyle={{ color: '#616161' }}
            placeholder="descripción"
            value={businessToEdit.description}
            onChangeText={(newDescription: string) =>
              setBusinessToEdit({
                ...businessToEdit,
                description: newDescription,
              })
            }
          />
          <View style={styles.buttonContainer}>
            {actions.map(({ title, type, options }) => {
              return (
                <DemoButton
                  key={title}
                  onPress={() => onUploadImage(type, options)}
                >
                  {title}
                </DemoButton>
              );
            })}
          </View>
          {/* <DemoResponse>{image}</DemoResponse> */}

          {image?.assets &&
            image.assets.map(({ uri }) => (
              <View key={uri} style={styles.image}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={{ width: 200, height: 200 }}
                  source={{ uri: uri }}
                />
              </View>
            ))}
          <LogoutButton onPress={logout} />
        </ScrollView>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator animating={true} size="large" color="#FFC074" />
    </View>
  );
};
