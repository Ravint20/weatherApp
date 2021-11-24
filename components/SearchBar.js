import React, { useState  } from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 


// main function for search

export default function SearchBar({ getWeatherData }) {

    const [place, setCityName] = useState('');

    return (
        <View style={styles.searchBox}>
            <TextInput 
                placeholder='Please Enter City name'
                value={place}
                onChangeText={(text) => setCityName(text)}
                returnKeyType='search'
            />
            <EvilIcons name="search" size={28} color="black"  onPress={() => getWeatherData(place)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        marginTop: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray',
        borderColor: 'lightgray'
    }
})
