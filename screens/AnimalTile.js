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
import backArrowImage from './11.png';

function AnimalTile({navigation}) {
  const route = useRoute();
  const liked = route.params.paramKey;
  url_string = liked.animal.link;
  console.log(url_string);
  url = new URL(url_string);

  function navAllLiked() {
    navigation.replace('Liked');
  }

  navAllLiked2 = () => {
    navigation.replace('Liked');
  };

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
          <Image style={styles.animalImg} source={{uri: liked.animal.image}} />
          <Text style={styles.animalName}>{liked.animal.name}</Text>
          <Text style={styles.animalBreed}>
            {liked.animal.gender} {liked.animal.breed}, {liked.animal.age}
          </Text>
          <Text style={styles.bio}>About Me: {liked.animal.bio}</Text>
          <Text style={styles.bio}>Size: {liked.animal.size}</Text>
          <Text style={styles.bio}>Shelter: {liked.animal.shelter}</Text>
          <Text style={styles.bio}>House Trained: {liked.animal.trained}</Text>
          <Text style={styles.bio}>Vaccinated: {liked.animal.vaccinated}</Text>
          <Text style={styles.tags}>Tags: {liked.animal.tags}</Text>
        </View>

        <TouchableOpacity
          style={{
            height: 100,
            width: 390,
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
    width: 370,
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
