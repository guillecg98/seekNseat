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

export const BusinessProfileScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}> Business profile screen </Text>
        </View>
    )
}