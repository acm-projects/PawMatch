import React from "react";

import {TouchableOpacity, View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import SearchModal from "./SearchModal";
import { searchAnimalsMore } from '../api/searchAnimals.js';
import apiJSON from '../api/apicall.json';

const ShelterScreen = ({navigation}) => {

        const Tile = (props) => {
            /*
            function expandTile() {
              navigation.replace("Tile", {paramKey: props});
            };
            */
        
            const{name, type, primary_photo_cropped} = props.animal;
            return(
            <TouchableOpacity style={styles.tile} onPress={'#'}>
                <Image style={styles.animalImg} source={{uri: primary_photo_cropped.small,}}/> 
                <Text style={styles.animalName}>{name}</Text>
                <Text>{type}</Text>
            </TouchableOpacity>
            );
          };

        var call  = searchAnimalsMore(78745, "Dog", "Cat", "Rabbit", "Bird", "Young", "Baby", "Adult", "Senior", "Female", "Male", "Small", "Medium", "Large");
          console.log(call);

        if (typeof call !== 'undefined' ){
          return (
            <View style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <SearchModal/>
                <Text style={{marginLeft: 20, marginTop: 10}}>Searching for...</Text>    
                <View style={styles.containerTile}>
                  {call.animals.map(i => 
                    (<Tile key={i.id} animal = {i} />)
                  )} 
                </View>
            </View>
            
          );
        } else {
          return (
            <View style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <SearchModal/>
                <Text style={{marginLeft: 20, marginTop: 10}}>Searching for...</Text>    
                <View style={styles.containerTile}>
                  {apiJSON.animals.map(i => 
                    (<Tile key={i.id} animal = {i} />)
                  )} 
                </View>
            </View>
            
          );
        }

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