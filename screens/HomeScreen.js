import React from "react";
import { View, Text, Button, TouchableOpacity} from 'react-native';
import {Image, ImageBackground} from 'react-native';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
  } from 'react-native';
import animals from '../data/animals';

const HomeScreen = ({navigation}, props) => {
    return (
        <View style={styles.container}>
          <Card animal = {animals[0]} />

            <TouchableOpacity
                onPress = {console.log('back button clicked')}
                style = {styles.backButton}>

                <Text>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {console.log('dislike button clicked')}
                style = {styles.dislikeButton}>
                <Text>Dislike</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {console.log('like button clicked')}
                style = {styles.likeButton}>
                <Text>Like</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {console.log('super like button clicked')}
                style = {styles.superlikeButton}>
                <Text>Super Like</Text>
            </TouchableOpacity>
        </View>

    );

}

export default HomeScreen;




const Card = (props) => {
  const{name, image, breed, bio} = props.animal;
  return(
  <View style={styles.card}>
      <ImageBackground 
          source={{uri: image,}} 
          style={styles.image}>
          <View style={styles.cardInner}>
            <Text style ={styles.name}>{name}</Text>
            <Text style ={styles.breed}>{breed}</Text>
            <Text style ={styles.bio}>{bio}</Text>
          </View>
      </ImageBackground>
  </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
  
    card: {
      width: '90%',
      height: '60%',
      borderRadius: 10,
  
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 1,
      shadowRadius: 16.00,
  
      elevation: 24,
    },
  
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      overflow: 'hidden', 
  
      justifyContent: 'flex-end',
    },
  
    cardInner: {
      padding: 10,
      //backgroundColor: 'pink'
    },
  
    name:{
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold',
  
    },
  
    breed: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
  
    },
  
    bio: {
      fontSize: 15,
      color: 'white',
      lineHeight: 24,
  
    },

    backButton: {
        marginTop: 20,
        position: 'absolute',
        left: 20,
        top: 500,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'gray',
    },

    buttonImage: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },

    dislikeButton: {
        marginTop: 20,
        position: 'absolute',
        left: 120,
        top: 500,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#de4545',
    },

    likeButton: {
        marginTop: 20,
        position: 'absolute',
        left: 220,
        top: 500,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#45de63',
    },

    superlikeButton: {
        marginTop: 20,
        position: 'absolute',
        left: 310,
        top: 500,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#f7f754',
    },


  
  });
