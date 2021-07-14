import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import { CheckInfoButton } from "./check-info-button.component";


const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        elevation: 8,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
    },
    list: {
        flex: 1,
        marginTop: 10,
        padding: 15,
    },
    listItem: {
        padding: 2,
    }
})

type Props = {
    businessList: [];
    navigation: any;
}

export const BusinessList = (props: Props) => {
    return(
        <View style={styles.listContainer}>

            <ScrollView style={styles.list}>
            {
                props.businessList.map((business) => (
                <ListItem style={styles.listItem} key={business.id}>
                    <ListItem.Content >
                    <ListItem.Title>{business.name}</ListItem.Title>
                    </ListItem.Content>
                    <Avatar
                        avatarStyle={{borderRadius: 15}}
                        size="large"
                        source={{uri: 'https://picsum.photos/300'}}/>
                    <ListItem.Content>
                        <CheckInfoButton onPress={() => props.navigation.navigate('Business')} />
                    </ListItem.Content>
                </ListItem>
                ))
            }
            </ScrollView>

        </View>
    );
}