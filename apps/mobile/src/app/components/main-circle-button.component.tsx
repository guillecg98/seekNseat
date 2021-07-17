import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        borderWidth: .5,
        backgroundColor: '#596275',
        borderRadius: 65,
        width: 130,
        height: 130,
        margin: 5,
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

export const MainCircleButton = (props: Props) => {
    return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={props.onPress}>
                <Text style={styles.textButton}> {props.title} </Text>
        </TouchableOpacity>
    )
}