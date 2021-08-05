import { BusinessDTO } from '@seekNseat/contracts/business';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { BusinessCard } from '../components';
import { getBusiness } from '../requests';

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        flex: 1,
        marginTop: 30,
    }
})

export const BusinessScreen = ({ route }) => {

    const { businessId } = route.params;
    const [business, setBusiness] = useState<BusinessDTO>();
    useEffect( () => {
        getBusiness(businessId)
        .then( (res) => {
            setBusiness(res?.data)
        })
    }, [businessId])

    if(business) {
        return(
            <View style={styles.container}>
                <BusinessCard
                    name={business.name}
                    contactPhone={business.contactPhone}
                    description={business.description} />
            </View>
        )
    } else {
        return(
            <View style={styles.loadingContainer}>
            <ActivityIndicator
                animating={true}
                size='large'
                color='#4884CA' />
        </View>
        )
    }
}