import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MainCircleButton, SecondaryCircleButton } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionHeader: {
        flex: 2,
        padding: 15,
        justifyContent: 'center',
    },
    textHeader: {
        fontSize: 35,
        color: '#4884CA',
        textAlign: 'center',
    },
    section: {
        flex: 4,
        padding: 10,
        flexDirection: 'row',
    },
    sectionFooter: {
        flex: 2,
        padding: 15,
        justifyContent: 'center',
    },
})

export const BusinessHomePage = ({ navigation }) => {
    return(
        <View style={styles.container}>

            <View style={styles.sectionHeader}>
            <Text style={styles.textHeader}> Welcome back, username! </Text>
            </View>

            <View style={styles.section}>
                <SecondaryCircleButton title='Bookings' icon="book-open" onPress={() => navigation.navigate('BusinessReservations')} />
                <MainCircleButton title='Schedules' icon="plus" onPress={() => navigation.navigate('BusinessSchedules')} />
                <SecondaryCircleButton title='Profile' icon="user" onPress={() => navigation.navigate('BusinessSchedules')} />
            </View>

            <View style={styles.sectionFooter}>
                <Text style={{textAlign: 'center'}}> The footer should be here</Text>
            </View>

        </View>
    )
}