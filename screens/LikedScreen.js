import React from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import animals from '../data/animals';

const LikedScreen = ({navigation}) => {
  animalKey = 0;

  const Tile = props => {
    function expandTile() {
      navigation.replace('Tile', {paramKey: props});
    }

    var text = 'expand>>';

    const {name, image, breed, id, link, trained, vaccinated, shelter, tags} = props.animal;
    return (
      <TouchableOpacity style={styles.tile} onPress={expandTile}>
        <Image style={styles.animalImg} source={{uri: image}} />
        <Text style={styles.animalName}>{name}</Text>
        <Text style={{marginLeft: 5, color: '#6867ac'}}>{breed}</Text>
        <Text style={styles.expandTile}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff2f7'}}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Favorites</Text>
        </View>

        <View style={styles.container}>
          {animals.map(i => (
            <Tile key={i.id} animal={i} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    width: 135,
    height: 135,
    borderRadius: 20,
    marginLeft: 4.5,
    marginTop: 5,
  },
  expandTile: {
    fontSize: 13,
    marginTop: 1,
    fontWeight: 'bold',
    marginLeft: 87,
    color: '#CE7BB0',
  },
});
