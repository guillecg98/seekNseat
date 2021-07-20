import { BusinessDTO } from "@seekNseat/contracts";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { BusinessList } from "../components";
import { getBusinesses } from "../requests";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#4884CA',
        fontSize: 23,
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 5,
    }
})

export const BusinessesScreen = ({ navigation }) => {

    const [businessList, setBusinessList] = useState<BusinessDTO[]>([])

    useEffect( () => {
        getBusinesses()
        .then( (res) => {
            setBusinessList(res?.data)
        })
    }, []);

    if(businessList) {
        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}> Restaurants based on search </Text>
                </View>

                <View style={styles.listContainer}>
                    <BusinessList businessList={businessList} navigation={navigation} />
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