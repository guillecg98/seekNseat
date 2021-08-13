import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 25,
        borderRadius: 30,
    }
})

export const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const onSearch = (query: string) => setSearchQuery(query)

    return(
        <Searchbar
            selectionColor='#0D8686'
            style={styles.container}
            placeholder="Búsqueda por nombre"
            onChangeText={onSearch}
            value={searchQuery}/>
    )
}