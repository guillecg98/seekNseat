import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BusinessCard } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    }
})

export const BusinessScreen = () => {
    return(
        <View style={styles.container}>
            <BusinessCard />
        </View>
    )
}