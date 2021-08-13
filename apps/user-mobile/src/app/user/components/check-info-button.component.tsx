import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    checkInfoButton: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#0D8686',
        width: 90,
    }
})

type Props = {
    disabled: boolean;
    onPress: any;
}

export const CheckInfoButton = (props: Props) => {
    return(
        <Button
            style={styles.checkInfoButton}
            disabled={props.disabled}
            mode='contained'
            uppercase={false}
            color='#0D8686'
            onPress={props.onPress}>
                Info
        </Button>
    )
}