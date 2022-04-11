import React from "react";

import { View, Text, StyleSheet } from 'react-native';


import SearchModal from "./SearchModal";

const ShelterScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
            <Text style={styles.title}>Pet Search</Text>
            <SearchModal/>
            <Text style={{marginLeft: 20, marginTop: 10}}>Searching for...</Text>
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
    title: {
        fontSize: 40,
        marginTop: 20,
        marginBottom: 3,
        fontWeight: '800',
        color: '#fb5555',
        alignSelf: 'center'
      },
})