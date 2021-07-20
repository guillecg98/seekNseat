import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { InitialButton } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#596275',
    },
    section: {
        flex: 1,
        padding: 15,
    },
    intro: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
    },
    textIntro: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
})


export const TypeOfUserScreen = ({ navigation }) => {

    return(
        <View style={styles.container}>

            <View style={styles.section}>
                <View style={styles.intro}>
                    <Text style={styles.textIntro}> Hi there! What are you feeling like? </Text>
                </View>
            </View>

            <View style={styles.section}>
                <InitialButton
                    icon="food-fork-drink"
                    text="I'm a consumer"
                    onPress={() => navigation.navigate('UserHomePage')}/>
            </View>

            <View style={styles.section}>
                <InitialButton
                    icon="chef-hat"
                    text="I'm a business"
                    onPress={() => navigation.navigate('BusinessHomePage')}/>
            </View>

        <View style={{ flex:0.5}}/>
      </View>
    );
}