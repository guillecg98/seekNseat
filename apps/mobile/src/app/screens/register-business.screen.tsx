import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

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
    },
    intro: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
    },
    textIntro: {
        fontSize: 25,
        color: '#4884CA',
        textAlign: 'center',
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 0.5,
    },
    button: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 60,
        backgroundColor: '#4884CA',
        borderRadius: 30,
        height: 45,
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    dropdown: {
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 30,
        height: 40,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#596275',
    },
    textDropdown: {
        fontSize: 18,
        color: '#596275',
        textAlign: 'center',
    }
})

export const RegisterBusinessScreen = () => {

    const [name, setName] = useState('');
    const [contactPhone, setContactPhone] = useState('')

    return(
        <View style={styles.container}>

            <Text> this should be the header </Text>

            <View style={styles.section}>
            <TouchableOpacity style={styles.intro}>
                    <Text style={styles.textIntro}> Nice! Tell us about your awesome business </Text>
                </TouchableOpacity>
            </View>

            <View style={{flex: 2, padding: 15}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Business name"
                    onChangeText={setName}
                    clearButtonMode="while-editing"
                    value={name}
                    />

                <TextInput
                    style={styles.textInput}
                    placeholder="Contact phone"
                    onChangeText={setContactPhone}
                    value={contactPhone}
                    keyboardType="numeric"
                    />

                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => console.log('category list!')}
                    >
                        <Text style={styles.textDropdown}> Select your categories </Text>
                    </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('submited!')}
                    >
                        <Text style={styles.textButton}> Publish </Text>
                    </TouchableOpacity>

            </View>

            <View style={{ flex:0.5}}>
                <Text> this should be the footer </Text>
            </View>
        </View>
    );
}