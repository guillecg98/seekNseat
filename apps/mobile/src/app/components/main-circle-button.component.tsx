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
        marginBottom: 30,
    },
    circleButton: {
        width: 110,
        height: 110,
        elevation: 10,
        borderRadius: 55,
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

export const MainCircleButton = (props: Props) => {
    return(
        <View style={styles.container}>
            <View style={styles.sectionButton}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.circleButton}
                onPress={props.onPress}>
                    <Icon size={65} type='feather' name={props.icon} color='white' />
            </TouchableOpacity>
            <Text style={styles.textButton}> {props.title} </Text>
            </View>
        </View>
    )
}