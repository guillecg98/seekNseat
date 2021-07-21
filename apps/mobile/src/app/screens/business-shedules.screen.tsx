import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
})

export const BusinessSchedulesScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}> Business schedules screen </Text>
        </View>
    )
}