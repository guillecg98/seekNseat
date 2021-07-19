import { BusinessDTO } from '@seekNseat/contracts';
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import { CheckInfoButton } from "./check-info-button.component";


const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        elevation: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
    },
    list: {
        flex: 1,
        marginTop: 10,
        padding: 10,
    },
    listItem: {
        padding: 2,
    }
})

type Props = {
    businessList: BusinessDTO[];
    navigation: any;
}

export const BusinessList = (props: Props) => {
    return(
        <View style={styles.listContainer}>
            <ScrollView style={styles.list}>
            {
                props.businessList.map((business) => (
                        <ListItem
                            key={business.id}
                            style={styles.listItem}
                            containerStyle={{borderRadius: 12}}>
                            <ListItem.Content >
                                <ListItem.Title>{business.name}</ListItem.Title>
                            </ListItem.Content>
                            <Avatar
                                avatarStyle={{borderRadius: 12}}
                                size="large"
                                source={{uri: 'https://www.emprendedores.es/wp-content/uploads/2015/01/ginos-logo-1542112796-1024x512.jpg'}}/>
                            <ListItem.Content>
                                <CheckInfoButton onPress={() => props.navigation.navigate('BusinessProfile', {businessId: business.id})} />
                            </ListItem.Content>
                        </ListItem>
                ))
            }
            </ScrollView>
        </View>
    );
}