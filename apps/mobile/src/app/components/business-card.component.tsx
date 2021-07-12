import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph,  } from 'react-native-paper';

import ReservationButton from './reservation-button.component';

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
    },
    cardTitle: {
        color: '#4884CA',
          marginTop: 15,
          margin: 85,
          marginBottom: 15,
    },
    cardCover: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    description: {
        color: 'black',
        margin: 10,
        marginTop: 10,
    },
});

const BusinessCard = () => {
    return(
        <Card style={styles.cardContainer} elevation={8}>
            <Card.Title titleStyle={styles.cardTitle} title="example" />
            <Card.Content>
                <Card.Cover style={styles.cardCover} source={{ uri: 'https://picsum.photos/300' }} />
                <Paragraph style={styles.description}> brief description </Paragraph>
            </Card.Content>

            <Card.Actions style={{justifyContent: 'center'}}>
                <ReservationButton/>
            </Card.Actions>
        </Card>
    )
}

export default BusinessCard;