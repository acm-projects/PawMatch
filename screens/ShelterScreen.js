import React from "react";
import {TouchableOpacity, Text, Image, StyleSheet, View, ScrollView} from 'react-native';
import SearchModal from "./SearchModal";
import { searchAnimals } from '../api/searchAnimals.js';
import Search from '../api/Search.js';
import { apicall } from './InterestPage'

//console.log(searchAnimals(78747, "Dog", "Young", "Male", "Small"));
//            <Image style={styles.animalImg} source={{uri: image,}}/> 

//            <Image style={styles.animalImg} source={{uri: photos[0].small,}}/>
//var animalData;

/*
(async function() {
  animalData = await searchAnimals(78747, "Dog", "Young", "Male", "Small");
  console.log(animalData);
})();
*/


const ShelterScreen = ({navigation}) => {
/*
  const Tile = (props) => {
    function expandTile() {
      navigation.replace("Tile", {paramKey: props});
    };

    const{name, type, primary_photo_cropped} = props.animal;
    return(
    <TouchableOpacity style={styles.tile} onPress={expandTile}>
        <Image style={styles.animalImg} source={{uri: primary_photo_cropped.small,}}/> 
        <Text style={styles.animalName}>{name}</Text>
        <Text>{type}</Text>
    </TouchableOpacity>
    );
  };
  */
/*
  async function searchAnimals(pZipcode, aType, aAge, aGender, aSize) {

    await client.animal.search ({
      location: pZipcode,
      type: aType,
      age: aAge,
      gender: aGender,
      size: aSize,
      limit: 1,
    }).then((resp) => {
      animalData = resp.data;
    });
  }
 
    async function LoadTiles() {
      await searchAnimals(78745, "Dog", "Young", "Male", "Small");
      console.log(animalData);
      return (
        <View style={styles.containerTile}>
            {animalData.animals.map(i => 
              (<Tile key={i.id} animal = {i} />
              )
            )}  
          </View>
      );
    };
*/


      return (
        <ScrollView>
            <SearchModal/>
            <Text>Searching for...</Text>
            <Search/>
        </ScrollView>
        
    );
};

/*
            <View style={styles.containerTile}>
            {animals.animals.map(i => 
              (<Tile key={i.id} animal = {i} />
              )
            )}  
          </View>
*/

export default ShelterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchText: {
        
    },
    title: {
        fontSize: 25,
        margin: 30,
        fontWeight: 'bold',
        color: '#fb5555',
      },
    containerTile: {
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