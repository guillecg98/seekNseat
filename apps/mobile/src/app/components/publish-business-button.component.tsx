import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    publishBusinessButton: {
        borderRadius: 20,
    }
})

type Props = {
    onPress: any;
}
export const PublishBusinessButton = (props: Props) => {
    return(
        <Button
            style={styles.publishBusinessButton}
            mode='contained'
            color='#4884CA'
            uppercase={false}
            onPress={props.onPress}
            >
                Publish
        </Button>
    )
}