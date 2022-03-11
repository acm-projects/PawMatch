import React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';

const LikedScreen = ({navigation}) => {
    return (
        <ScrollView>
    
          <View>
            <Text style={styles.title}>Liked</Text>
          </View>
    
          <View style={styles.container}>
    
            <View style={styles.tile}>
              <Image style={styles.animalImg} source={{uri: 'https://www.thesprucepets.com/thmb/MJ--9BJULRDvodDrmrqCxzYYIy4=/3504x2336/filters:fill(auto,1)/Pomeranian-GettyImages-1014940472-a6ba0030958a4bbba0eee3e982ee9bc6.jpg'}}/> 
              <Text style={styles.animalName}>Biscuit</Text>
              <Text>Pomeranian</Text>
            </View>

            <View style={styles.tile}>
              <Image style={styles.animalImg} source={{uri: '#'}}/> 
              <Text style={styles.animalName}>Biscuit</Text>
              <Text>Pomeranian</Text>
            </View>
    
          </View>
    
        </ScrollView>
      );
}


export default LikedScreen;


const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        margin: 30,
        fontWeight: 'bold',
        color: '#fb5555',
      },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      tile: {
        backgroundColor: '#FFBCD1',
        width: '40%',
        height: 220,
        padding: 10,
        margin: 10,
        borderRadius: 20,
      },
      animalName: {
        color: '#6867ac',
        fontSize: 20,
      },
      animalImg: {
        width: 135, 
        height: 135, 
        borderRadius: 20,
      }
})