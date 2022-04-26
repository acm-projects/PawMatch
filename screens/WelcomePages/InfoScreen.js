import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const InfoScreen = ({navigation}) => {

    function nextNavigation(user) {
        navigation.replace("Profile")
        navigation.replace('PawMatch')
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', bottom: 40}}>
            <Text style={{fontWeight: '900', fontSize: 90, textAlign: 'center'}}>Are you lonely?</Text>
            
           <TouchableOpacity style={styles.button} onPress={nextNavigation}>
                <Text style={{fontSize: 40, fontWeight: 'bold', color: '#BA5775', marginHorizontal: 10}}>yes</Text>
                <View style={{marginTop: 20}}><MaterialCommunityIcons name={"emoticon-sad-outline"} size={35}/></View>
           </TouchableOpacity>
           <Text style={{textAlign: 'center', fontSize: 18, top: 55}}>Don't Worry!</Text>
           {/* <Button title={"Yes"} onPress={nextNavigation} /> */}
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
    button: {
        padding: 5,
        marginHorizontal: 100,
        bottom: -50,
        // left: 110,
        justifyContent: 'center',
        borderRadius: 100,
        marginTop: -18,
        alignItems: 'center',
        backgroundColor: '#F9A2BD',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})