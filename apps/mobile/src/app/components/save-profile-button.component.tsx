import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

const styles = StyleSheet.create({
    button: {
        fontSize: 18,
        color: '#596275',
    },
})

type Props = {
    onPress: any;
}

export const SaveProfileButton = (props: Props) => {
    return (
        <Button
            titleStyle={styles.button}
            title='SAVE'
            type='clear'
            onPress={props.onPress} />
    )
}