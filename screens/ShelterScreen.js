import React, {useState, useEffect} from "react";
import {TouchableOpacity, View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import SearchModal from "./SearchModal";
import apiJSON from '../api/apicall.json';
import {sZipCode, sAge, sType, sSize, sGender, sSearchState} from "./InterestPage";

var petfinder = require("@petfinder/petfinder-js");
//var client = new petfinder.Client({apiKey: "BW2quofQcKQRW8zaW5nxGCLiYxvlnYPZWfoWhD19EMp9oHbmjJ", secret: "zrA4VcQo24kvI21xAZjE6Ok8ZD6EZjEQ3JPBJ6hA"});
var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});
//var client = new petfinder.Client({apiKey: "P2a91yMjApUn8QYGc6OCutLXCYx4DRZuXHusdWQZxT3FDLkVqr", secret: "M4e9kQONsJUK8xDUah65CWNMwdmyRrK2llgXD8qQ"});

const ShelterScreen = ({navigation}) => {
    const [apiData, setApiData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isNewSearch, setSearch] = useState([]);
    
    //const [isNewSearch, setSearchState] = useState(sSearchState);
    /*
    console.log(sZipCode);
    console.log(sType);
    console.log(sAge);
    console.log(sGender);
    console.log(sSize);
    */

    function searchAnimalsMore(aZipcode, aType, aAge, aGender, aSize, lim) {
      if (isLoading){
        client.animal.search({
          location: aZipcode,
          type: aType,
          age: aAge,
          gender: aGender,
          size: aSize,
          limit: lim,
        }).then(resp => {
          setApiData(resp.data);
          setLoading(false);
          //setSearchState(false);
          return resp.data;
        });
      }
    }

        const Tile = (props) => {

            function expandTile() {
              navigation.replace("Tile2", {paramKey: props});
            };

        
            const{name, type, primary_photo_cropped} = props.animal;
            var image;
            if ( primary_photo_cropped === null){
              image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
            } else {
              image = primary_photo_cropped.small;
            }
            return(
            <TouchableOpacity style={styles.tile} onPress={expandTile}>
                <Image style={styles.animalImg} source={{uri: image}}/> 
                <Text style={styles.animalName}>{name}</Text>
                <Text>{type}</Text>
            </TouchableOpacity>
            );
          };

       searchAnimalsMore(sZipCode[0], sType[0], sAge[0], sGender[0], sSize[0], 6);
       /*
       if (isNewSearch.length != sSearchState.length){
        setSearch(sSearchState);
        console.log(isNewSearch);
       }
      console.log(sType);
      */
       //console.log("YOOOOOOOOOOOOOOOOOOOOOOOO");
       //console.log(apiData);

        //const callapi  = searchAnimalsMore(78745, "Dog", "Cat", "Rabbit", "Bird", "Young", "Baby", "Adult", "Senior", "Female", "Male", "Small", "Medium", "Large");
        //console.log(callapi);

        if (!isLoading){
          return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <SearchModal/>
                <View style={styles.containerTile}>
                  {apiData.animals.map(i => 
                    (<Tile key={i.id} animal = {i} />)
                  )} 
                </View>
            </ScrollView>
            
          );
        } else {
          return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <SearchModal/>
                <Text style={{marginLeft: 20, marginTop: 10, fontSize: 20}}>Searching for...</Text>    
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