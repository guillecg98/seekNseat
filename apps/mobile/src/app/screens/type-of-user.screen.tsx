import { CategoryDTO } from '@seekNseat/contracts';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { InitialButton } from '../components';
import { getCategories } from '../requests';

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

    let parsedCategories = [{
        label: '',
        value: ''
    }];

    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    useEffect( () => {
        getCategories()
        .then( res => setCategories(res?.data))
    }, [])

    if(categories) {
        parsedCategories = categories.map( (category: CategoryDTO) => (
            {
                label: category.name,
                value: category.id,
            }
        ))
    }

    if(categories) {
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
                        onPress={ () => {
                            navigation.navigate(
                                'UserHomePage', {
                                parsedCategories: parsedCategories
                            })
                        }} />
                </View>

                <View style={styles.section}>
                    <InitialButton
                        icon="chef-hat"
                        text="I'm a business"
                        onPress={() => {
                            navigation.navigate(
                                'Register', {
                                    parsedCategories: parsedCategories
                            })
                        }} />
                </View>
            <View style={{ flex:0.5}}/>
          </View>
        );
    } else {
        return(
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    size='large'
                    color='white' />
            </View>
        )
    }
}