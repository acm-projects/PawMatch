import React from "react";
import {TouchableOpacity, View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import animals from '../data/animals';

const LikedScreen = ({navigation}) => {
  animalKey = 0;

  const Tile = (props) => {
    function expandTile() {
      navigation.replace("Tile", {paramKey: props});
    };

    const{name, image, breed, id} = props.animal;
    return(
    <TouchableOpacity style={styles.tile} onPress={expandTile}>
        <Image style={styles.animalImg} source={{uri: image,}}/> 
        <Text style={styles.animalName}>{name}</Text>
        <Text>{breed}</Text>
    </TouchableOpacity>
    );
  };

    return (
        <ScrollView>
  
          <View>
            <Text style={styles.title}>Liked</Text>
          </View>
    
          <View style={styles.container}>
            {animals.map(i => 
              (<Tile key={i.id} animal = {i} />
              )
            )}  
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