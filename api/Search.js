import React, { Component } from "react";
import {TouchableOpacity, Text, Image, StyleSheet, View, ScrollView} from 'react-native';
import animals from './apicall.json';


var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});

var animalData;

const Tile = (props) => {
    const{name, type, primary_photo_cropped} = props.animal;
    return(
    <TouchableOpacity style={styles.tile}>
        <Image style={styles.animalImg} source={{uri: primary_photo_cropped.small,}}/> 
        <Text style={styles.animalName}>{name}</Text>
        <Text>{type}</Text>
    </TouchableOpacity>
    );
  };


export default class Search extends Component{
  constructor() {
    super();
    this.state = { aData: [] };
  }

    async searchAnimals(pZipcode, aType, aAge, aGender, aSize) {
    await client.animal.search ({
        location: pZipcode,
        type: aType,
        age: aAge,
        gender: aGender,
        size: aSize,
        limit: 1,
    }).then((resp) => {
        
        //console.log(animalData);
        this.setState({ aData: resp.data });
        return resp.data;
    });
    }

    

    render() {
        (async function() {
            animalData = await this.searchAnimals(78747, "Dog", "Young", "Male", "Small");
            console.log(animalData);
        })();
        if (animalData) {
            return (<View style={styles.containerTile}>
                {animalData.animals.map(i => 
                  (<Tile key={i.id} animal = {i} />)
                )}  
              </View>);
        } else {
            return (<View style={styles.containerTile}>
                {animals.animals.map(i => 
                  (<Tile key={i.id} animal = {i} />)
                )}  
              </View>);

        }
    }

}

//<Tile key={i.id} animal = {i} />

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

/*
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});


export async function searchAnimals(pZipcode, aType, aAge, aGender, aSize) {

  var animalData;

   await client.animal.search ({
    location: pZipcode,
    type: aType,
    age: aAge,
    gender: aGender,
    size: aSize,
    limit: 1,
  }).then((resp) => {
    animalData = resp;
    //console.log(animalData);
    return animalData;
  });
  
}
*/
/*
var animalData;

   await client.animal.search ({
    location: pZipcode,
    type: aType,
    age: aAge,
    gender: aGender,
    size: aSize,
    limit: 1,
  }).then(resp => {
    animalData = resp.data.animals;
    console.log(animalData);
    return animalData;
  });
  */

//TO GET ALL POSSIBLE RESULTS or TO FLIP THROUGH PAGES
/*
  let page = 1;
  let pets = 0;
  let lim = 5;

    let dogIdx = (page - 1) * 100;
    while (pets < lim){
      apiResult.data.animals.forEach(function(animal) {
        //only logs animals with names, not with numbers as names
        if (!IsNum(animal.name)){
          console.log(animal.name);
          console.log(animal.id);
          console.log("#");
          pets++;
        }
      });
    }
    page++;
  } while(apiResult.data.pagination && apiResult.data.pagination.total_pages >= page && (pets < lim));
  console.log("##################");
*/


/*
(async function() {
  await searchAnimals("Dog", "Bernedoodle");
})();

*/
/*
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});

export const searchAnimals = async (pZipcode, aType, aAge, aGender, aSize) => {
   const resp = await client.animal.search ({
    location: pZipcode,
    type: aType,
    age: aAge,
    gender: aGender,
    size: aSize,
    limit: 1,
  })
  return resp.data
}
*/