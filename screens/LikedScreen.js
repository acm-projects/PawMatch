import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const LikedScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>heart Screen</Text>
        </View>
    );

}

export default LikedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})