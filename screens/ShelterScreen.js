import React, {useState, useEffect} from "react";

import {TouchableOpacity, View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import SearchModal from "./SearchModal";
import apiJSON from '../api/apicall.json';

var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "BW2quofQcKQRW8zaW5nxGCLiYxvlnYPZWfoWhD19EMp9oHbmjJ", secret: "zrA4VcQo24kvI21xAZjE6Ok8ZD6EZjEQ3JPBJ6hA"});
//var client = new petfinder.Client({apiKey: "BW2quofQcKQRW8zaW5nxGCLiYxvlnYPZWfoWhD19EMp9oHbmjJ", secret: "zrA4VcQo24kvI21xAZjE6Ok8ZD6EZjEQ3JPBJ6hA"});

const ShelterScreen = ({navigation}) => {
    const [apiData, setApiData] = useState({});
    const [isLoading, setLoading] = useState(true);

    function searchAnimalsMore(pZipcode, aType1, aType2, aType3, aType4, aAge1, aAge2, aAge3, aAge4, aGender1, aGender2, aSize1, aSize2, aSize3) {

      client.animal.search({
        location: pZipcode,
        type: aType1, aType2, aType3, aType4,
        age: aAge1, aAge2, aAge3, aAge4,
        gender: aGender1, aGender2,
        size: aSize1, aSize2, aSize3,
        limit: 2,
      }).then(resp => {
        setApiData(resp.data);
        setLoading(false);
        return resp.data;
      });
    }

        const Tile = (props) => {
            /*
            function expandTile() {
              navigation.replace("Tile", {paramKey: props});
            };
            */
        
            const{name, type, primary_photo_cropped} = props.animal;
            return(
            <TouchableOpacity style={styles.tile}>
                <Image style={styles.animalImg} source={{uri: primary_photo_cropped.small,}}/> 
                <Text style={styles.animalName}>{name}</Text>
                <Text>{type}</Text>
            </TouchableOpacity>
            );
          };

       searchAnimalsMore(78745, "Dog", "Cat", "Rabbit", "Bird", "Young", "Baby", "Adult", "Senior", "Female", "Male", "Small", "Medium", "Large");
       //console.log("YOOOOOOOOOOOOOOOOOOOOOOOO");
       //console.log(apiData);

        //const callapi  = searchAnimalsMore(78745, "Dog", "Cat", "Rabbit", "Bird", "Young", "Baby", "Adult", "Senior", "Female", "Male", "Small", "Medium", "Large");
        //console.log(callapi);

        if (!isLoading){
          return (
            <View style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <SearchModal/>
                <Text style={{marginLeft: 20, marginTop: 10}}>Searching for...</Text>    
                <View style={styles.containerTile}>
                  {apiData.animals.map(i => 
                    (console.log(i.name))
                  )} 
                </View>
            </View>
            
          );
        } else {
          return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <SearchModal/>
                <Text style={{marginLeft: 20, marginTop: 10}}>Searching for...</Text>    
                <View style={styles.containerTile}>
                  {apiJSON.animals.map(i => 
                    (<Tile key={i.id} animal = {i} />)
                  )} 
                </View>
            </ScrollView>
            
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