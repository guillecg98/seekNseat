import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { BusinessList } from "../components";
import { getBusinesses } from "../requests";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#4884CA',
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 5,
    }
})

export const BusinessesScreen = ({ navigation }) => {

    const [businessList, setBusinessList] = useState([])

    useEffect( () => {
        getBusinesses()
        .then( (res) => {
            setBusinessList(res?.data)
        })
    }, []);

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
}