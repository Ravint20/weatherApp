import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import {  rainy, sunny } from '../assets/backgroundImages/index';

export default function Weather({ weatherData, getWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);


    // destructuring api data
    const { weather,
            name,
            main: { temp, humidity,temp_min,temp_max ,pressure},
            wind: { speed }
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(changeBackgroundImg(main));
    }, [weatherData])


    //function call  for background change

    function changeBackgroundImg(weather) {
        
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
       
        return sunny;   
    }

    
    // returing method of search
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ImageBackground 
                source={backgroundImage}
                style={styles.imgBackground}
                resizeMode='cover'
            > 
                 <SearchBar getWeatherData={getWeatherData} />

                <View style={{alignItems: 'center' }}>
                   
                    <Text style={{ ...styles.headerText, color: '#fff', fontWeight: 'bold'}}>{name}</Text>
                   
                </View>
               <View style={{flex:1, width: Dimensions.get('screen').width}}>
                <View style={styles.subContainer}>

                    <View style={styles.paraContainer}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
                    </View>

                    <View style={styles.paraContainer}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Temperature</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{temp} °C</Text>
                    </View>

                    
                
                </View>

                <View style={styles.subContainer}>

                    <View style={styles.paraContainer}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Pressure</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{pressure} pa </Text>
                    </View>

                    <View style={styles.paraContainer}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind speed </Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
                    </View>

                    
                
                </View>
                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      
     
    },
    imgBackground: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 45,
        marginTop: 30,
    },
    subContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10
    },
    paraContainer: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    }
});
  