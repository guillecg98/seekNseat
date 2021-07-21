import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Modal, Paragraph, Portal, Provider, Text  } from 'react-native-paper';

import { ReservationButton } from './reservation-button.component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 4,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 12,
    },
    cardContainer: {
        marginTop: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardTitle: {
        fontSize: 24,
        textAlign: 'center',
        color: '#4884CA',
        padding: 10,
    },
    cardCover: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    descriptionStyle: {
        fontSize: 16,
        color: 'black',
        margin: 10,
        marginTop: 30,
    },
    modal: {
        height: 150,
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    }
});

type Props = {
    name: string;
    contactPhone: string;
    address?: string;
    description?: string;
}

export const BusinessCard = (props: Props) => {

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true)
    const hideModal = () => setVisible(false);

    return(
        <View  style={styles.container}>
        <Provider>
            <ScrollView>
        <Card style={styles.cardContainer}>
            <Card.Title titleStyle={styles.cardTitle} title={props.name} />
                <Card.Content>
                    <Card.Cover style={styles.cardCover} source={{ uri: 'https://picsum.photos/300' }} />
                    <Paragraph style={styles.descriptionStyle}>
                        {props.description ? props.description : 'There is no description for this business yet'}
                    </Paragraph>
                    <Paragraph style={styles.descriptionStyle}>
                        Contact phone: {props.contactPhone}
                    </Paragraph>
                </Card.Content>
            <Card.Actions style={{justifyContent: 'center'}}>
                <ReservationButton
                    onPress={showModal}/>
                <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Text style={{fontSize: 20}}>Yeah! you asked for a reservation, you will get response ASAP!</Text>
                </Modal>
                </Portal>
            </Card.Actions>
        </Card>
        </ScrollView>
        </Provider>
        </View>
    )
}