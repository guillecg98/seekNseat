import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: .5,
        backgroundColor: '#596275',
        borderRadius: 50,
        width: 95,
        height: 95,
        marginTop: 30,
    },
    textButton: {
        color: 'white',
        textAlign: 'center',
    }
})

type Props = {
    title: string;
    onPress: any;
}

export const SecondaryCircleButton = (props: Props) => {
    return(
        <TouchableOpacity
            activeOpacity={.8}
            style={styles.button}
            onPress={props.onPress}>
            <Text style={styles.textButton}> {props.title} </Text>
        </TouchableOpacity>
    )
}