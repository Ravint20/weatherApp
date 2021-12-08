import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Weather from './components/WeatherScreen';
import SearchBar from './components/SearchBar';

const API_KEY = "49985fcfeecde8530fdd2d13012d7fc6";

// main function
export default function App() {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);


    // fetching data
    async function getWeatherData(place) {
        setLoading(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);

            // adding to local storge when search is success
            AsyncStorage.setItem(place, JSON.stringify(response), (err)=> {
                if(err){
                    console.log("an error");
                    throw err;
                }
                console.log("success saved in local storage");
            }).catch((err)=> {
                console.log("error is: " + err);
            });
            if (response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
               
            } else {
                setWeatherData(null);
            }
            setLoading(true);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherData('batticaloa');
    }, [])

// getting data when needed
    _gettingData = async () => {
        try {
          const value = await AsyncStorage.getItem('place');
          if (value !== null) {
            // We have data!!
            console.log(JSON.parse(value));;
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    // main rendering method


    // managing loading data

    if (!loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray' size={36} />
            </View>

        )
    }

    else if (weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar getWeatherData={getWeatherData} />
                <Text style={styles.textStyle}>No match  Found! please  Try different place </Text>
            </View>
        )
    }

    // main render data method
    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} getWeatherData={getWeatherData} />
        </View>
    );
}


// styling components

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#01345B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        margin: 20,
        fontSize: 28,
        color:"#fff"
    }
});
