import React from "react";
import { Button, View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

function AnimalTile({navigation}) {

  const route = useRoute();
  const shelters = route.params.paramKey;

  function navShelters() {
    navigation.replace("Shelters");
  };

  if ( shelters.animal.primary_photo_cropped === null){
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
  } else {
    image = shelters.animal.primary_photo_cropped.small;
  }

    return (
        <ScrollView>
          <View style={styles.tile}>
            <Image style={styles.animalImg} source={{uri: image}}/> 
            <Text style={styles.animalName}>{shelters.animal.name}</Text>
            <Text style={styles.animalBreed}>{shelters.animal.type}</Text>
            <Text>{shelters.animal.bio}</Text>
          </View>
          
          <Button title="Back" onPress={navShelters} color="#919A8C"/>

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