import React, {useState} from "react";
import {useRef} from "react";
import { View, Text, Button, TouchableOpacity, Pressable} from 'react-native';
import {Image, ImageBackground} from 'react-native';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    Animated,
  } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import animals from '../data/animals';
import animalDemo from '../data/animalDemo';
import backImage from '../icons/back.png';
import dislikeImage from '../icons/dislike.png';
import likeImage from '../icons/heart.png';
import superlikeImage from '../icons/star3.png';

// add shelter to tinder card, address and phone #
// more info added to card
// color ideas for ui
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});
var sZipCode = [];
var sType = [];
var sAge = [];
var sGender = [];
var sSize = [];
const HomeScreen = ({navigation}, props) => {

//TRAVERSE THROUGH CARD STACK, UPDATE INDEX, AND FLIP TO FRONT OF CARD
const [index, setIndex] = useState(0);
const [apiData, setApiData] = useState({});
const [isLoading, setLoading] = useState(true);
// const [Id, setId] = useState(123);
// const [name, setName] = useState(null);
// const [breed, setBreed] = useState(null);
// const [image, setImage] = useState(null);
// const [bio, setBio] = useState(null);
// const [size, setSize] = useState(null);
// const [link, setLink] = useState(null);
// const [gender, setGender] = useState(null);
// const [trained, setTrained] = useState(null);
// const [vaccinated, setVaccinated] = useState(null);
// const [shelter, setShelter] = useState(null);

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

const [user1, setUser1] = useState();
const {uid} = auth().currentUser;
const getUser = async () => {
  try {
    const documentSnapshot = await firestore()
      .collection('users')
      .doc(uid)
      .get();

    const userData = documentSnapshot.data();
    setUser1(userData);
  } catch {

  }
};



const user = firebase.auth().currentUser;
const userID = user.uid;
var animalcard = animalDemo[index];

  const increaseIndex = () => {
    if (index == 19) {
      console.log("Reached end of stack");
      setIndex(index)
    }
    else {
      setIndex(index + 1);
    }
  }  

  const decreaseIndex = () => {
    if (index == 0) {
      setIndex(index);
      console.log("Reached beginning of stack");
    }
    else {
      var animalcard = animalDemo[index - 1];
      let id = (animalcard.id).toString();
      firestore().collection('users').doc(userID).collection('liked').doc(id).delete()
      firestore().collection('users').doc(userID).collection('superLiked').doc(id).delete()
      setIndex(index - 1);
    }
    checkCard();
    console.log("Back button pressed");
    
  }

  const dislike = () => {
    increaseIndex();
    checkCard();
  }
  // setBreed(animalcard.breed);
    // setImage(animalcard.image);
    // setBio(animalcard.bio);
    // setSize(animalcard.size);
    // setLink(animalcard.link);
    // setGender(animalcard.gender);
    // setTrained(animalcard.trained);
    // setVaccinated(animalcard.vaccinated);
    // setShelter(animalcard.shelter);
  const like = () => {
    let id = (animalcard.id).toString();
    firestore().collection('users').doc(userID).collection('liked').doc(id).set({animalcard})
    increaseIndex();
    checkCard();
    console.log("Like button pressed");
    
  }

  const superLike = () => {
    let id = (animalcard.id).toString();
    firestore().collection('users').doc(userID).collection('superLiked').doc(id).set({animalcard})
    increaseIndex();
    checkCard();
    console.log("Super Like button pressed");
  }

//CARD FLIP ANIMATION
  const animate = useRef(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);

  const interpolateFront = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const interpolateBack = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    Animated.timing(animate.current, {
      duration: 300,
      toValue: isFlipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
      console.log("Card flipped: isFlipped = " + isFlipped);
    });
  };

  const checkCard = () => {
    if (isFlipped == true)
      flipCard();
  }

  return (
    
        <View style={styles.container}>
          <TouchableOpacity
            onPress={flipCard}
            style={[{ transform: [{ rotateY: interpolateFront}]}, styles.animatedCard, styles.hidden]}>
              <Animated.View style={[{ transform: [{ rotateY: interpolateFront}]}, styles.animatedCard, styles.hidden]}>
                <FrontCard animal = {animalDemo[index]}/>
              </Animated.View>
          </TouchableOpacity>
            
          <TouchableOpacity
            onPress={flipCard}
            style={[styles.cardBack, styles.hidden, { transform: [{ rotateY: interpolateBack}]}]}>
              <Animated.View >
                <ScrollView>
                  <BackCard animal = {animalDemo[index]}/>
                </ScrollView>
              </Animated.View>
          </TouchableOpacity>
            
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap',
          position: 'absolute', bottom: 39,}}>
            <TouchableOpacity
                  onPress = {() => <FrontCard animal = {animalDemo[decreaseIndex()]}/>}
                  style={{margin:9}}>
                  <MaterialCommunityIcons name={"arrow-left-circle"} color={'#ACACAC'} size={70} />
                  {/* <Image source={backImage} style = {styles.backButton}></Image> */}
              </TouchableOpacity>

              <TouchableOpacity
                  onPress = {() => <FrontCard animal = {animalDemo[dislike()]}/>}
                  style={{margin:8, marginLeft: 4}}>
                  <MaterialCommunityIcons name={"close-circle"}  color={'#F15771'} size={77} />
                  {/* <Image source={dislikeImage} style = {styles.dislikeButton}></Image> */}
              </TouchableOpacity>

              <TouchableOpacity
                  onPress = {() => <FrontCard animal = {animalDemo[like()]}/>}
                  style={{margin:8}}>
                  <MaterialCommunityIcons name={"heart-circle"}  color={'#41D65A'} size={77} />
                  {/* <Image source={likeImage} style = {styles.likeButton}></Image> */}
              </TouchableOpacity>

              <TouchableOpacity
                  onPress = {() => <FrontCard animal = {animalDemo[superLike()]}/>}
                  style={{margin:10, marginRight: 13}}>
                  <MaterialCommunityIcons name={"star-circle-outline"} color={'#F8C55F'} size={70} />
                  {/* <Image source={superlikeImage} style = {styles.superlikeButton}></Image> */}
              </TouchableOpacity>
          </View>
            
        </View>

    );

}

export default HomeScreen;



const data = Array.from({ length: 500});

const FrontCard = (props) => {
  const{name, breeds, primary_photo_cropped} = props.animal;
  var image;
          if ( primary_photo_cropped === null){
            if (type === 'Dog'){
                image = 'https://i.pinimg.com/564x/43/7a/9d/437a9d58adfe0b277efc3d6906d6a55c.jpg';
              } else if (type === 'Cat') {
                  image = 'https://i.pinimg.com/564x/ad/f8/de/adf8dea81bb563653fca398ce4d53040.jpg';
              } else if (type == 'Bird') {
                  image = 'https://i.pinimg.com/564x/66/4c/45/664c45cf13a13b3a3c57fe6f2e3149cb.jpg';
              } else if (type === 'Barnyard') {
                  image = 'https://i.pinimg.com/564x/ae/bd/81/aebd81411b57b56353edbf2f50616f52.jpg';
              } else {
                  image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
              }
            } else {
              image = primary_photo_cropped.small;
            }
  return(
  <View style={styles.cardFront}>
      <ImageBackground 
          source={{uri: image,}} 
          style={styles.image}>
         
          {data.map((_, i) => (
              <View
                key={i}
                style = {{
                  position: 'absolute',
                  backgroundColor: '#FC5975',
                  height: 7,
                  bottom: (150 - i),
                  right: 0,
                  left: 0,
                  zIndex: 2,
                  opacity: (1 / 1000) * (i + 1),
                }}/>
            ))}
      </ImageBackground>
      <View style={styles.cardGradient}>
        <Text style ={styles.name}>{name}</Text>
        <Text style ={styles.breed}>{breeds.primary}</Text>
      </View>
  </View>
  );
};


//KIDS, VACCINATED
const BackCard = (props) => {
  const{name, breeds, description, primary_photo_cropped, age, gender, size, contact, attributes} = props.animal;
  var image;
  if ( primary_photo_cropped === null){
    if (type === 'Dog'){
        image = 'https://i.pinimg.com/564x/43/7a/9d/437a9d58adfe0b277efc3d6906d6a55c.jpg';
      } else if (type === 'Cat') {
          image = 'https://i.pinimg.com/564x/ad/f8/de/adf8dea81bb563653fca398ce4d53040.jpg';
      } else if (type == 'Bird') {
          image = 'https://i.pinimg.com/564x/66/4c/45/664c45cf13a13b3a3c57fe6f2e3149cb.jpg';
      } else if (type === 'Barnyard') {
          image = 'https://i.pinimg.com/564x/ae/bd/81/aebd81411b57b56353edbf2f50616f52.jpg';
      } else {
          image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
      }
    } else {
      image = primary_photo_cropped.small;
    }
  return(
      <View style={styles.cardInner}>
        <Text style ={styles.name}>{name}</Text>
        <Text style ={styles.breed}>{breeds.primary}</Text>
        <Text style ={styles.text}>{description}</Text>
        <Text style ={styles.text}></Text>
        
        
        <View>{age != null ? (<Text style={[styles.text, {fontSize: 21}]}>Age: {age}</Text>) : (<></>)}</View>
        <View>{gender != null ? (<Text style={[styles.text, {fontSize: 21}]}>Gender: {gender}</Text>) : (<></>)}</View>
        <View>{size != null ? (<Text style={[styles.text, {fontSize: 21}]}>Size: {size}</Text>) : (<></>)}</View>
        <Text style ={styles.text}></Text>
        <Text style ={[styles.text, {fontWeight: 'bold'}]}>Extra Info</Text>
        <View>{attributes.special_needs != false 
            ? (<Text style={styles.text}>Special Needs Pet!</Text>)
            : (<></>)}
        </View>
        <View>{attributes.spayed_neutered != false 
            ? (<Text style={styles.text}>Spayed/Neutered: Yes</Text>) 
            : (<Text style={styles.text}>Spayed/Neutered: No</Text>)}
        </View>
        <View>{attributes.declawed != false && attributes.declawed != null
            ? (<Text style={styles.text}>Declawed: Yes</Text>) 
            : (<></>)}
        </View>
        <View>{attributes.shots_current != false 
            ? (<Text style={styles.text}>Shots are Current</Text>) 
            : (<Text style={styles.text}>Shots are NOT Current</Text>)}
        </View>
        
        <View>{attributes.house_trained != false 
            ? (<Text style={styles.text}>House Trained: Yes</Text>) 
            : (<Text style={styles.text}>House Trained: No</Text>)}
        </View>

        <Text style ={styles.text}></Text>
        <Text style ={[styles.text, {fontWeight: 'bold'}]}>Shelter Info</Text>
        <View>{contact.phone != null ? (<Text style={styles.text}>Phone: {contact.phone}</Text>) : (<></>)}</View>
        <View>{contact.email != null ? (<Text style={styles.text}>Email: {contact.email}</Text>) : (<></>)}</View>
      </View>
  );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    hidden: {
      backfaceVisibility: 'hidden',
    },
    
    cardGradient: {
      position: 'absolute', 
      justifyContent: 'center', 
      alignContent: 'center', 
      padding: 10, 
      bottom: 0,
    },
    
    cardFront: {
      width: '100%',
      height: '75%',
      borderRadius: 30,
      shadowColor: "#9D3849",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 1,
      shadowRadius: 16.00,
  
      elevation: 30,
      position: 'absolute',
      top: 50,
    },

    cardBack: {
      width: '90%',
      height: '70%',
      borderRadius: 15,
      padding: 5,
      shadowColor: "#9D3849",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 1,
      shadowRadius: 16.00,
  
      elevation: 30,
      position: 'absolute',
      backgroundColor: '#F97088',
      top: 60,
    },

    animatedCard: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      padding: 10,
    },

    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      overflow: 'hidden',   
      justifyContent: 'flex-end',
      resizeMode: 'cover',
    },

    imageBack: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      overflow: 'hidden',   
      justifyContent: 'flex-end',
      resizeMode: 'cover',
      
    },
  
    cardInner: {
      padding: 10,
      //backgroundColor: 'pink'
    },
  
    name:{
      fontSize: 45,
      color: 'white',
      fontWeight: 'bold',
    },
  
    breed: {
      fontSize: 25,
      color: 'white',
      fontWeight: 'bold',
    },

    text: {
      fontSize: 20,
      color: 'white',
    },

    backButton: {
        marginTop: 210,
        position: 'absolute',
        left: -180,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dislikeButton: {
      marginTop: 210,
      position: 'absolute',
      left: -83,
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },

    likeButton: {
      marginTop: 210,
      position: 'absolute',
      left: 15,
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },

    superlikeButton: {
      marginTop: 207,
      position: 'absolute',
      left: 110,
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
  });
