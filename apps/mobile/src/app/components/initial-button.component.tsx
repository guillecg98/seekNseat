import React from "react";
import { StyleSheet } from "react-native";
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    button: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 20,
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 20,
        color: '#596275',
    }
})

type Props = {
    icon: string;
    text: string;
    onPress: any;
}

export const InitialButton = (props: Props) => {
    return(
        <Button
            icon={props.icon}
            mode="contained"
            color="white"
            uppercase={false}
            style={styles.button}
            labelStyle={styles.textButton}
            onPress={props.onPress}
        >
            {props.text}
        </Button>
    );
}