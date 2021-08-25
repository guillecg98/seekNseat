import { BusinessDTO } from '@seekNseat/contracts/business';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import { CheckInfoButton } from './check-info-button.component';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  list: {
    padding: 10,
  },
  listItem: {
    padding: 5,
  },
});

interface Props {
  businesses: BusinessDTO[];
  navigation: any;
}

export const Businesses = (props: Props) => {

  const onCheckBusinessInfo = (businessId: string) => {
    props.navigation.navigate('Business', {
      businessId: businessId,
    });
  };

  return (
    <ScrollView style={styles.listContainer}>
      <View style={styles.list}>
        {props.businesses.map((business) => (
          <ListItem
            key={business._id}
            style={styles.listItem}
            containerStyle={[
              { borderRadius: 18 },
              business.blocked ? { backgroundColor: '#dddddd' } : {},
            ]}
          >
            <ListItem.Content style={{ alignItems: 'center' }}>
              <ListItem.Title style={{ fontSize: 16, margin: 5 }}>
                {business.name}
              </ListItem.Title>
              {business.blocked ? (
                <ListItem.Title
                  style={{ fontSize: 16, textAlign: 'center', color: 'red' }}
                >
                  {' '}
                  Reservas bloqueadas{' '}
                </ListItem.Title>
              ) : null}
            </ListItem.Content>
            <Avatar
              avatarStyle={{ borderRadius: 12, alignItems: 'center' }}
              size="large"
              source={{
                uri: 'https://www.emprendedores.es/wp-content/uploads/2015/01/ginos-logo-1542112796-1024x512.jpg',
              }}
            />
            <ListItem.Content style={{ alignItems: 'center' }}>
              <CheckInfoButton
                disabled={business.blocked ? true : false}
                onPress={() => onCheckBusinessInfo(business._id)}
              />
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
};
