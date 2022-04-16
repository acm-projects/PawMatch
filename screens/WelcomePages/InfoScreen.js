import React from "react";

import { View, Text, StyleSheet, Button } from 'react-native';

const InfoScreen = ({navigation}) => {

    function nextNavigation(user) {
        navigation.replace("PawMatch")
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Text>General info about app</Text>
            <Button title={"Next"} onPress={nextNavigation} />
        </View>
        
    );
}


export default InfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 40,
        marginTop: 20,
        marginBottom: 3,
        fontWeight: '800',
        color: '#fb5555',
        alignSelf: 'center'
      },
})