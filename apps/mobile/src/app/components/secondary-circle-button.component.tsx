import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionButton: {
        padding: 20,
    },
    circleButton: {
        width: 95,
        height: 95,
        elevation: 10,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#596275',
    },
    textButton: {
        fontSize: 18,
        marginTop: 10,
        color: '#596275',
        textAlign: 'center',
    }
})

type Props = {
    title: string;
    icon: string;
    onPress: any;
}

export const SecondaryCircleButton = (props: Props) => {
    return(
        <View style={styles.container}>
            <View style={styles.sectionButton}>
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.circleButton}
                onPress={props.onPress}>
                <Icon size={40} type='feather' name={props.icon} color='white' />
            </TouchableOpacity>
            <Text style={styles.textButton}> {props.title} </Text>
            </View>
        </View>
    )
}