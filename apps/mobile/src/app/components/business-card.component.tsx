import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Modal, Paragraph, Portal, Provider, Text  } from 'react-native-paper';

import { ReservationButton } from './reservation-button.component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    },
    cardContainer: {
        elevation: 18,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 24,
        textAlign: 'center',
        color: '#4884CA',
        padding: 15,
    },
    cardCover: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    description: {
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

export const BusinessCard = () => {

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true)
    const hideModal = () => setVisible(false);

    return(
        <Provider>
        <ScrollView style={styles.container}>
        <Card style={styles.cardContainer} elevation={8}>
            <Card.Title titleStyle={styles.cardTitle} title="Example" />
                <Card.Content>
                    <Card.Cover style={styles.cardCover} source={{ uri: 'https://picsum.photos/300' }} />
                    <Paragraph style={styles.description}>
                        XYZ is a partnership firm owned and operated by A and B in the city of Davis, California. You can find all types of lab equipment for schools and colleges. ABC Company provides high quality plumbing services. We have been serving St. Washougal, Washington and neighboring areas for more than 12 years.
                        XYZ is a partnership firm owned and operated by A and B in the city of Davis, California. You can find all types of lab equipment for schools and colleges. ABC Company provides high quality plumbing services. We have been serving St. Washougal, Washington and neighboring areas for more than 12 years.
                        XYZ is a partnership firm owned and operated by A and B in the city of Davis, California. You can find all types of lab equipment for schools and colleges.
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
    )
}