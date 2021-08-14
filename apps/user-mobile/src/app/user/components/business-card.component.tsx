import { BusinessDTO } from '@seekNseat/contracts/business';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Card,
  Divider,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';

import { ResquestBookingButton } from './request-booking-button.component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionStyle: {
    fontSize: 16,
    color: '#525252',
    margin: 10,
    fontStyle: 'italic',
    marginTop: 30,
  },
});

type Props = {
  business: BusinessDTO;
};

export const BusinessCard = (props: Props) => {
  return (
    <ScrollView>
      <Card>
        <Card.Cover source={{ uri: 'https://static1-sevilla.abc.es/Media/201411/24/tgb-restalia-campana--644x362.jpg' }} />
        <Card.Content style={{ padding: 15 }}>
          <Title style={{margin: 5}}> {props.business.name} </Title>
          <View
            style={{flexDirection: 'row', marginTop: 10,}}
          >
            <Card.Content style={{flex:3, marginTop: 5, flexDirection: 'row' }}>
              <Icon name="location" type="ionicon" color="#0D8686" />
              <Text style={{fontSize: 14, color: '#808080'}}> {props.business.address ? props.business.address : 'No se ha añadido dirección'} </Text>
            </Card.Content>

            <Card.Content
              style={{
                flex:2,
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <Icon name="call" type="ionicon" color="#0D8686" />
              <Text style={{fontSize: 14, color: '#808080'}}> {props.business.contactPhone} </Text>
            </Card.Content>
          </View>
        </Card.Content>
        <Divider />
        <Card.Content style={{ margin: 5, justifyContent: 'center', }}>
          <Paragraph style={styles.descriptionStyle}>
            "{props.business.description
              ? props.business.description
              : 'Este establecimiento aún no tiene descripción'}"
          </Paragraph>
        </Card.Content>
      </Card>
      <Divider />
    </ScrollView>
  );
};
