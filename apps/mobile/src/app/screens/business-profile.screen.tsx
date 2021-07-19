import { BusinessDTO, EditBusinessDTO } from '@seekNseat/contracts';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';

import { BusinessProfileForm, SaveProfileButton } from '../components';
import { editBusinessProfile, getBusiness } from '../requests';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    sectionHeader: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4884CA',
    },
    sectionForm: {
        flex: 6,
        justifyContent: 'center',
    },
    sectionFooter: {
        flex: 1,
    },
    text: {
        textAlign: 'center',
    },
})

export const BusinessProfileScreen = ({ navigation, route }) => {

    const { businessId } = route.params;
    const [business, setBusiness] = useState<BusinessDTO>();

    useEffect( () => {
        getBusiness(businessId)
        .then( (res) => {
            setBusiness(res?.data)
        })
    }, [])

    const [name, setName] = useState(business?.name ? business.name : '');
    const [contactPhone, setContactPhone] = useState(business?.contactPhone ? business.contactPhone : '');
    const [address, setAddress] = useState(business?.address ? business.address : '');
    const [description, setDescription] = useState(business?.description ? business.description : '');

    const onSaveProfile = () => {
        if (business) {
            const editBusiness: EditBusinessDTO  = {
                name: name,
                contactPhone: contactPhone,
                address: address,
                description: description,
            }
            console.log(editBusiness);
            editBusinessProfile(businessId, editBusiness)
            .then( res => console.log(res?.data))

            navigation.navigate('Initial')
        } else {
            console.log('Business undefined')
        }
    }

    if(business) {
        return(
            <View style={styles.container}>

                <View style={styles.sectionHeader}>
                    <Text style={styles.title}> Business Profile {/* This should have style */}</Text>
                    <SaveProfileButton onPress={onSaveProfile} />
                </View>

                <View style={styles.sectionForm}>
                    <ScrollView>
                    {/* <BusinessProfileForm
                        id={businessId}
                        name={business.name}
                        contactPhone={business.contactPhone}
                        description={business.description ? business.description : 'Not description yet'}/> */}

                    <Input
                        label="Name"
                        placeholder="Business Name"
                        value={name}
                        onChangeText={setName} />

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
                    </ScrollView>
                </View>

                <View style={styles.sectionFooter}>

                </View>
            </View>
        )
    } else {
        return(
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={true}
                        size='large'
                        color='#4884CA' />
                </View>
        )
    }
}