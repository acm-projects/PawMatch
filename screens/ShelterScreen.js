import React from "react";

import {TouchableOpacity, View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import SearchModal from "./SearchModal";
import { searchAnimalsMore } from '../api/searchAnimals.js';
import { apiJSON } from '../api/apicall.json';

const ShelterScreen = ({navigation}) => {

        const Tile = (props) => {
            /*
            function expandTile() {
              navigation.replace("Tile", {paramKey: props});
            };
            */
        
            const{name, image, breed, id} = props.animal;
            return(
            <TouchableOpacity style={styles.tile} onPress={'#'}>
                <Image style={styles.animalImg} source={{uri: image,}}/> 
                <Text style={styles.animalName}>{name}</Text>
                <Text>{breed}</Text>
            </TouchableOpacity>
            );
          };

        const getAPICall = async () => {
            searchAnimalsMore(78745, "Dog", "Cat", "Rabbit", "Bird", "Young", "Baby", "Adult", "Senior", "Female", "Male", "Small", "Medium", "Large").then((request) => {
            }
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <SearchModal/>
                <Text style={{marginLeft: 20, marginTop: 10}}>Searching for...</Text>    
                <View style={styles.container}>
                    {apiJSON.animals.map(i => 
                      (console.log(i.name)
                      )
                    )}  
                  </View>
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