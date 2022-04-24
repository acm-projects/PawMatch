import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
  // const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  
  animalKey = 0;

  // function getAnimals(animalData) {
  //   if (isLoading) {
      
  //     for (var i = 0; i < animalData.length; i++) {
  //       client.animal.show(animalData[i]).then(function (response) {
  //         likedAnimalsData.push(response.data.animal);
  //         setApiData(likedAnimalsData);
  //         //console.log(resp.data.animal.name);
  //       });
        
  //     }
  //     setLoading(false);
  //   }
  // }


  // getAnimals(likedAnimals);
  // //console.log(apiData);

  var list = [];
  const [likedData, setLikedData] = useState([])
  const {uid} = auth().currentUser;
  const getLiked = async () => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(uid)
        .collection('liked')
        .get()
    //     .then(collectionSnapshot => {
    //       console.log('Total liked: ', collectionSnapshot.size);
    // });
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setLikedData([...list]);
        
    } catch {

    }
  };

  useEffect(() => {
    getLiked();
  }, []);
  

  


  function output() {
    likedData.map(item => {
      console.log(item.animalcard.size);
    })
    
  }

  const Tile = props => {
    function expandTile() {
      navigation.replace('Tile', {paramKey: props});
    }
    const {
      name, breeds, primary_photo_cropped,
      type, age, gender,
      size, status, contact,
      attributes, species,
    } = props.i;
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
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
      }
    } else {
      image = primary_photo_cropped.small;
    }
    return (
      <TouchableOpacity style={styles.tile} onPress={expandTile}>
        <Image style={styles.animalImg} source={{uri: image}} />
        <Text style={styles.animalName}>{name}</Text>
        <Text style={{marginLeft: 5, color: '#6867ac'}}>{breeds.primary}</Text>
      </TouchableOpacity>
    );
  };

  // if (!isLoading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff2f7'}}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Favorites</Text>
          </View>
          {/* <Button title={'output'} onPress={() => output()}/> */}
          <View style={styles.container}>
            { likedData == []
            ? (<Text>Like Pets to Show Up Here!</Text>)
            : (likedData?.map(i => (
              <Tile i={i.animalcard} key={i.animalcard}/> 
                ))
              )
            
            }
            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  // } else {
  //   return (

  //     <ScrollView style={{flex: 1, backgroundColor: '#fbfbfb'}}>
  //       <Text style={styles.title}>Favorites</Text>
  //       <Text style={{marginLeft: 80, marginTop: 10, fontSize: 20}}>
  //         Searching for...
  //       </Text>
  //     </ScrollView>
  //   );
  // }
};

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
