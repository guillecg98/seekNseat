import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MainCircleButton, SecondaryCircleButton } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
    },
    sectionHeader: {
        flex: 2,
        padding: 15,
        justifyContent: 'center',
    },
    section: {
        flex: 3,
        alignItems: 'center',
    },
    sectionFooter: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    textIntro: {
        fontSize: 25,
        color: '#4884CA',
        textAlign: 'center',
    },
})

export const BusinessHomePage = () => {
    return(
        <View style={styles.container}>

            <View style={styles.sectionHeader}>
            <Text style={styles.textIntro}> Welcome back, username! </Text>
            </View>

            <View style={styles.section}>
                <View style={{flexDirection: 'row'}}>
                <SecondaryCircleButton title='Check Reservations' onPress={() => console.log('pressed')} />
                <MainCircleButton title='Add schedule' onPress={() => console.log('pressed')} />
                <SecondaryCircleButton title='Profile' onPress={() => console.log('pressed')} />
                </View>
            </View>

            <View style={styles.sectionFooter}>
                <Text style={{textAlign: 'center'}}> The footer should be here</Text>
            </View>

        </View>
    )
}