import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    checkInfoButton: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4884CA',
        width: 90,
    }
})

type Props = {
    onPress: any;
}

export const CheckInfoButton = (props: Props) => {
    return(
        <Button
            style={styles.checkInfoButton}
            mode='outlined'
            uppercase={false}
            color='#4884CA'
            onPress={props.onPress}>
                Info
        </Button>
    )
}