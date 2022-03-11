import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({navigation}) => {

    function logoutUser(){          
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        navigation.replace("Login");
    }

    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button color="#6867ac" title="Log Out" onPress={logoutUser} />
        </View>
    );

}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})