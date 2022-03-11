import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

const ShelterScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Shelter Screen</Text>
        </View>
    );

}

export default ShelterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})