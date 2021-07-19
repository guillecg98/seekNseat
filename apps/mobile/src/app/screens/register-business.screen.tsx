import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Input } from 'react-native-elements';

import { PublishBusinessButton } from '../components';
import { createBusiness } from '../requests';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent:  'center',
        backgroundColor: 'white',
    },
    section: {
        flex: 1,
        padding: 15,
        margin: 15,
        justifyContent: 'center',
    },
    textIntro: {
        fontSize: 25,
        color: '#4884CA',
        textAlign: 'center',
    },
    dropdown: {
        borderRadius: 30,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#596275',
        margin: 20,
    },
    textDropdown: {
        fontSize: 18,
        color: '#596275',
        textAlign: 'center',
    }
})

export const RegisterBusinessScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [contactPhone, setContactPhone] = useState('')

    const onPublishBusiness = () => {
        createBusiness(name,contactPhone)
        .then( res => console.log(res?.data))

        navigation.navigate('Initial')
    }

    return(
        <View style={styles.container}>
            {/* <ScrollView> */}

            <View style={styles.section}>
                <Text style={styles.textIntro}> Nice! Tell us about your awesome business </Text>
            </View>

            <View style={styles.section}>

                <Input
                    placeholder="Business name"
                    onChangeText={setName}
                    value={name} />

                <Input
                    placeholder="Contact phone"
                    onChangeText={setContactPhone}
                    value={contactPhone}
                    keyboardType="numeric" />

                <TouchableOpacity  //Refactor: replace with dropdown component
                    style={styles.dropdown}
                    onPress={() => console.log('category list!')}>
                        <Text style={styles.textDropdown}> Select your categories </Text>
                </TouchableOpacity>

                <PublishBusinessButton onPress={onPublishBusiness} />
            </View>

            <View style={{ flex:0.5}} />

            {/* </ScrollView> */}
        </View>
    );
}