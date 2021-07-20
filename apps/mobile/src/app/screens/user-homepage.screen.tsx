import { CategoryDTO } from "@seekNseat/contracts";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from "react-native-elements";

import { SearchBar } from "../components";
import { getCategories } from "../requests";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionHeader: {
        flex: 2,
        padding: 15,
        justifyContent: 'center',
    },
    textHeader: {
        fontSize: 35,
        color: '#4884CA',
        textAlign: 'center',
    },
    section: {
        margin: 16,
        flex: 4,
        padding: 15,
        justifyContent: 'center',
    },
    dropdown: {
        margin: 10,
        backgroundColor: 'white',
        borderBottomColor: '#596275',
        borderBottomWidth: 1,
        marginTop: 30,
    },
    sectionButton: {
        marginTop: 40,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    skipButton: {
        backgroundColor: '#4884CA',
        width: 100,
    },
    sectionFooter: {
        flex: 2,
        padding: 15,
        justifyContent: 'center',
    },
})

const numberOfFoodies = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
];

export const UserHomePage = ({ navigation }) => {

    let data = [{
        label: '',
        value: ''
    }];
    const [foodies, setFoodies] = useState(0);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    useEffect( () => {
        getCategories()
        .then( res => setCategories(res?.data))
    }, [])

    data = categories.map( (category: CategoryDTO) => (
        {
            label: category.name,
            value: category.id,
        }
    ))

    return(
        <View style={styles.container}>

        <View style={styles.sectionHeader}>
        <Text style={styles.textHeader}> Welcome back, username! </Text>
        </View>

        <View style={styles.section}>
            <SearchBar />
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={{fontSize: 18}}
                placeholder="Select number of foodies"
                data={numberOfFoodies}
                labelField="label"
                valueField="value"
                value={foodies}
                onChange={ (foodie) => {
                    setFoodies(foodie.value)
                }} />
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={{fontSize: 18}}
                placeholder="Select Category"
                search
                data={data}
                labelField="label"
                valueField="value"
                value={category}
                onChange={ (category: CategoryDTO) => {
                    setCategory(category.name)
                }} />
            <View style={styles.sectionButton}>
            <Button
                buttonStyle={styles.skipButton}
                title="Next"
                onPress={() => navigation.navigate('Businesses')}/>
            </View>
        </View>

        <View style={styles.sectionFooter}>
            <Text style={{textAlign: 'center'}}> The main navbar for users should be here</Text>
        </View>

    </View>
    )
}