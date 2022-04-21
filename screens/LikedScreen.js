import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

var petfinder = require('@petfinder/petfinder-js');
//var client = new petfinder.Client({apiKey: "BW2quofQcKQRW8zaW5nxGCLiYxvlnYPZWfoWhD19EMp9oHbmjJ", secret: "zrA4VcQo24kvI21xAZjE6Ok8ZD6EZjEQ3JPBJ6hA"});
//var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});
var client = new petfinder.Client({
  apiKey: 'P2a91yMjApUn8QYGc6OCutLXCYx4DRZuXHusdWQZxT3FDLkVqr',
  secret: 'M4e9kQONsJUK8xDUah65CWNMwdmyRrK2llgXD8qQ',
});

var likedAnimals = [55083515, 55083513, 55083530];
//55083515, 55083513, 55083530]
var likedAnimalsData = [];

const LikedScreen = ({navigation}) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  animalKey = 0;

  function getAnimals(animalData) {
    if (isLoading) {
      
      for (var i = 0; i < animalData.length; i++) {
        client.animal.show(animalData[i]).then(function (response) {
          likedAnimalsData.push(response.data.animal);
          setApiData(likedAnimalsData);
          //console.log(resp.data.animal.name);
        });
        
      }
      setLoading(false);
    }
  }


  getAnimals(likedAnimals);
  //console.log(apiData);

  const Tile = props => {
    function expandTile() {
      navigation.replace('Tile', {paramKey: props});
    }
 
    var text = 'expand>>';

    const {
      name,
      breeds,
      primary_photo_cropped,
      age,
      gender,
      size,
      status,
      contact,
      attributes,
      species,
    } = props.animal;
    var image;
    if (primary_photo_cropped === null) {
      if (type === 'Dog') {
        image =
          'https://i.pinimg.com/564x/43/7a/9d/437a9d58adfe0b277efc3d6906d6a55c.jpg';
      } else if (type === 'Cat') {
        image =
          'https://i.pinimg.com/564x/ad/f8/de/adf8dea81bb563653fca398ce4d53040.jpg';
      } else if (type == 'Bird') {
        image =
          'https://i.pinimg.com/564x/66/4c/45/664c45cf13a13b3a3c57fe6f2e3149cb.jpg';
      } else if (type === 'Barnyard') {
        image =
          'https://i.pinimg.com/564x/ae/bd/81/aebd81411b57b56353edbf2f50616f52.jpg';
      } else {
        image =
          'https://i.pinimg.com/564x/b4/fa/a2/b4faa20fcf903eaaafd7e1c063c85555.jpg';
      }
    } else {
      image = primary_photo_cropped.small;
    }
    return (
      <TouchableOpacity style={styles.tile} onPress={expandTile}>
        <Image style={styles.animalImg} source={{uri: image}} />
        <Text style={styles.animalName}>{name}</Text>
        <Text style={{marginLeft: 5, color: '#6867ac'}}>{breeds.primary}</Text>
        <Text style={styles.expandTile}>{text}</Text>
      </TouchableOpacity>
    );
  };

  if (!isLoading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff2f7'}}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Favorites</Text>
          </View>
          <View style={styles.container}>
            {apiData.map(i => (
              <Tile key={i.id} animal={i} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (

      <ScrollView style={{flex: 1, backgroundColor: '#fbfbfb'}}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={{marginLeft: 80, marginTop: 10, fontSize: 20}}>
          Searching for...
        </Text>
      </ScrollView>
    );
  }
};
/**
 * <View style={styles.container}>
            {apiData.map(i => (
              <Tile key={i.id} animal={i} />
            ))}
          </View>  
 */
export default LikedScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#6867AC',
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
    elevation: 5,
  },
  animalName: {
    color: '#6867ac',
    fontSize: 18,
    marginTop: 2,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  animalImg: {
    width: '94%',
    height: 135,
    borderRadius: 20,
    marginLeft: 4.5,
    marginTop: 5,
  },
  expandTile: {
    fontSize: 10,
    marginTop: 1,
    fontWeight: 'bold',
    marginLeft: 87,
    color: '#CE7BB0',
  },
});
