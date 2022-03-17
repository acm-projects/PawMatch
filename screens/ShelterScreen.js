import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import SearchModal from "./SearchModal";

const ShelterScreen = ({navigation}) => {
    return (
        <View>
            <SearchModal/>
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