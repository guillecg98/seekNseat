import  axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements';

import InitialButton from '../components/initial-button.component';
import { getBusinesses } from '../requests/get-businesses.request';

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
    button: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    textButton: {
        fontSize: 20,
        marginTop: 15,
        color: '#596275',
        textAlign: 'center',
    },
})


const InitialScreen = () => {

    const receiveBusinesses = () => {
        getBusinesses()
        .then( (res) => {
            console.log(res)
        })
    }

    return(
        <View style={styles.container}>

            <Text> this should be the header </Text>

            <View style={styles.section}>
                <TouchableOpacity style={styles.intro}>
                    <Text style={styles.textIntro}> Hi there! What are you feeling like? </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={receiveBusinesses}>
                        <Icon name="do-not-disturb" color='#596275'/>
                        <Text style={styles.textButton}> I'm a Consumer </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {console.log('api call wip')}}>
                        <Icon name="do-not-disturb" color='#596275'/>
                        <Text style={styles.textButton}> I'm a Business </Text>
                </TouchableOpacity>
            </View>

        <View style={{ flex:0.5}}>
          <Text> this should be the footer </Text>
        </View>
      </View>
    );
}

export default InitialScreen;