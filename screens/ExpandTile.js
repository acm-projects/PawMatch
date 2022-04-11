import React from "react";
import { Button, View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

function AnimalTile({navigation}) {

  const route = useRoute();
  const liked = route.params.paramKey;

  function navAllLiked() {
    navigation.replace("Shelters");
  };

    return (
        <ScrollView>
          <View style={styles.tile}>
            <Image style={styles.animalImg} source={{uri: liked.animal.photos[0].medium,}}/> 
            <Text style={styles.animalName}>{liked.animal.name}</Text>
            <Text style={styles.animalBreed}>{liked.animal.type}</Text>
            <Text>{liked.animal.description}</Text>
          </View>
          
          <Button title="Back" onPress={navAllLiked} color="#919A8C"/>

        </ScrollView>
      );
}


export default AnimalTile;

const styles = StyleSheet.create({
    tile: {
      backgroundColor: '#FFBCD1',
      height: 550,
      padding: 10,
      margin: 10,
      borderRadius: 20,
    },
    animalName: {
      color: '#6867ac',
      fontSize: 30,
    },
    animalImg: {
      width: 350, 
      height: 350, 
      borderRadius: 20,
    },
    animalBreed: {
      fontSize: 20,
      fontWeight: 'bold',
    }
})