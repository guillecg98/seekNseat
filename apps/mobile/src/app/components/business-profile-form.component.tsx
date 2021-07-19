//import { BusinessDTO } from '@seekNseat/contracts';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
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

type Props = {
    id: string;
    name: string;
    contactPhone: string;
    description: string;
}

export const BusinessProfileForm = (props: Props) => {

    const [name, setName] = useState(props.name);
    const [contactPhone, setContactPhone] = useState(props.contactPhone);
    const [description, setDescription] = useState(props.description);

    return(
        <View style={styles.container}>

            <Input
                label="Name"
                placeholder="Business Name"
                value={name}
                onChangeText={setName} />

            <TouchableOpacity  //Refactor: replace with dropdown component
                style={styles.dropdown}
                onPress={() => console.log('category list!')}>
                    <Text style={styles.textDropdown}> Select your categories </Text>
            </TouchableOpacity>

            <Input
                label="Description"
                placeholder="Description"
                value={description}
                onChangeText={setDescription} />

            <Input
                label="Contact Phone"
                placeholder="Contact Phone"
                value={contactPhone}
                onChangeText={setContactPhone}
                keyboardType="numeric" />

        </View>
    )
}