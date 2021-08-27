import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    button: {
        fontSize: 18,
        color: '#212424',
    },
})

type Props = {
    onPress: any;
}

export const SaveProfileButton = (props: Props) => {
    return (
        <Button
            titleStyle={styles.button}
            title='Guardar'
            type='clear'
            onPress={props.onPress} />
    )
}