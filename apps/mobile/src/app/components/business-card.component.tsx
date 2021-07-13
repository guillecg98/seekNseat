import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph,  } from 'react-native-paper';

import { getBusiness } from '../requests';
import { ReservationButton } from './reservation-button.component';

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

export const BusinessCard = () => {

    const getBusinessInfo = () => {
        getBusiness(':id')
        .then( (res) => console.log(res?.data))
    }

    return(
        <Card style={styles.cardContainer} elevation={8}>
            <Card.Title titleStyle={styles.cardTitle} title="example" />
            <Card.Content>
                <Card.Cover style={styles.cardCover} source={{ uri: 'https://picsum.photos/300' }} />
                <Paragraph style={styles.description}> XYZ is a partnership firm owned and operated by A and B in the city of Davis, California. You can find all types of lab equipment for schools and colleges. ABC Company provides high quality plumbing services. We have been serving St. Washougal, Washington and neighboring areas for more than 12 years. </Paragraph>
            </Card.Content>

            <Card.Actions style={{justifyContent: 'center'}}>
                <ReservationButton
                    onPress={getBusinessInfo}/>
            </Card.Actions>
        </Card>
    )
}