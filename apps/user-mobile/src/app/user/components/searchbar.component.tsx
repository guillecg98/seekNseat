import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        borderRadius: 30,
    }
})

export const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const onSearch = (query: string) => setSearchQuery(query)

    return(
        <Searchbar
            selectionColor='#4884CA'
            style={styles.container}
            placeholder="Search by Restaurant..."
            onChangeText={onSearch}
            value={searchQuery}/>
    )
}