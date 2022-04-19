import React from 'react';
import {
  Button,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import backArrowImage from '../../icons/11.png';

function AnimalTile({navigation}) {
  const route = useRoute();
  const liked = route.params.paramKey;

  url_string = liked.animal.url;
  console.log(url_string);
  url = new URL(url_string);

  function navAllLiked() {
    navigation.replace('Liked');
  }

  navAllLiked2 = () => {
    navigation.replace('Liked');
  };

  var image;
  if ( liked.animal.primary_photo_cropped === null){
    if (liked.animal.type === 'Dog'){
        image = 'https://i.pinimg.com/564x/43/7a/9d/437a9d58adfe0b277efc3d6906d6a55c.jpg';
    } else if (iked.animal.type === 'Cat') {
        image = 'https://i.pinimg.com/564x/ad/f8/de/adf8dea81bb563653fca398ce4d53040.jpg';
    } else if (iked.animal.type == 'Bird') {
        image = 'https://i.pinimg.com/564x/66/4c/45/664c45cf13a13b3a3c57fe6f2e3149cb.jpg';
    } else if (iked.animal.type === 'Barnyard') {
        image = 'https://i.pinimg.com/564x/ae/bd/81/aebd81411b57b56353edbf2f50616f52.jpg';
    } else {
        image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
    }
  } else {
    image = liked.animal.primary_photo_cropped.small;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff2f7'}}>
      <ScrollView>
        <View style={styles.tile}>
          <TouchableOpacity
            onPress={() => {
              this.navAllLiked2();
            }}>
            <Image source={backArrowImage} style={styles.back} />
          </TouchableOpacity>
          <Image style={styles.animalImg} source={{uri: image}} />
          <Text style={styles.animalName}>{liked.animal.name}</Text>
          <Text style={styles.animalBreed}>{liked.animal.breeds.primary}</Text>
          <Text>Status: {liked.animal.status}</Text>
          <Text>Gender: {liked.animal.gender}</Text>
          <Text>Age: {liked.animal.age}</Text>
          <Text>Size: {liked.animal.size}</Text>
          <Text>Phone: {liked.animal.contact.phone}</Text>
          <Text>Email: {liked.animal.contact.email}</Text>
        </View>

        <TouchableOpacity
          style={{
            height: 100,
            width: 370,
            marginLeft: 12,
            marginRight: 20,
            justifyContent: 'center',
            borderRadius: 100,
            marginTop: -18,
          }}>
          <Button
            title="Adopt"
            onPress={() => Linking.openURL(url.toString())}
            color="#6867ac"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 <Text style={styles.animalBreed}>
            {liked.animal.gender} {liked.animal.breed}, {liked.animal.age}
          </Text>
          <Text style={styles.bio}>About Me: {liked.animal.bio}</Text>
          <Text style={styles.bio}>Size: {liked.animal.size}</Text>
          <Text style={styles.bio}>Shelter: {liked.animal.shelter}</Text>
          <Text style={styles.bio}>House Trained: {liked.animal.trained}</Text>
          <Text style={styles.bio}>Vaccinated: {liked.animal.vaccinated}</Text>
          <Text style={styles.tags}>Tags: {liked.animal.tags}</Text>
 */

export default AnimalTile;

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#FFBCD1',
    height: 600,
    padding: 10,
    margin: 10,
    marginBottom: 1,
    borderRadius: 20,
    elevation: 3,
  },
  animalName: {
    color: '#6867ac',
    fontSize: 30,
    fontWeight: 'bold',
  },
  space: {
    width: 20, // or whatever size you need
    height: 10,
  },
  animalImg: {
    width: '100%',
    height: 330,
    borderRadius: 20,
    marginTop: 5,
    marginLeft: 1,
  },
  animalBreed: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6867ac',
  },
  bio: {
    fontSize: 15,
    color: '#6867ac',
  },
  tags: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6867ac',
  },
  back: {
    width: 70,
    height: 50,
    marginLeft: -15,
    marginBottom: -5,
  },
});
