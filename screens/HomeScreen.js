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
import animals from '../data/animals';
import backImage from '../icons/back.png';
import dislikeImage from '../icons/dislike.png';
import likeImage from '../icons/heart.png';
import superlikeImage from '../icons/star3.png';

// add shelter to tinder card, address and phone #
// more info added to card
// color ideas for ui

const HomeScreen = ({navigation}, props) => {

//TRAVERSE THROUGH CARD STACK, UPDATE INDEX, AND FLIP TO FRONT OF CARD
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (index == (animals.length - 1) ) {
      setIndex(index);
      console.log("Reached end of stack");
    }
    else {
      setIndex(index + 1);
    }
  }

  const decreaseIndex = () => {
    if (index == 0) {
      setIndex(0);
      console.log("Reached beginning of stack");
    }
    else {
      setIndex(index - 1);
    }
    checkCard();
    console.log("Back button pressed");
  }

  const dislike = () => {
    increaseIndex();
    checkCard();
    console.log("Dislike button pressed");
  }

  const like = () => {
    increaseIndex();
    checkCard();
    console.log("Like button pressed");
  }

  const superLike = () => {
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
                <FrontCard animal = {animals[index]}/>
              </Animated.View>
          </TouchableOpacity>
            
          <TouchableOpacity
            onPress={flipCard}
            style={[styles.cardBack, styles.hidden, { transform: [{ rotateY: interpolateBack}]}]}>
              <Animated.View >
                <ScrollView>
                  <BackCard animal = {animals[index]}/>
                </ScrollView>
              </Animated.View>
          </TouchableOpacity>
            
          
            <TouchableOpacity
                onPress = {() => <FrontCard animal = {animals[decreaseIndex()]}/>}>
                <Image source={backImage} style = {styles.backButton}></Image>
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {() => <FrontCard animal = {animals[dislike()]}/>}>
                <Image source={dislikeImage} style = {styles.dislikeButton}></Image>
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {() => <FrontCard animal = {animals[like()]}/>}>
                <Image source={likeImage} style = {styles.likeButton}></Image>
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {() => <FrontCard animal = {animals[superLike()]}/>}>
                <Image source={superlikeImage} style = {styles.superlikeButton}></Image>
            </TouchableOpacity>
        </View>

    );

}

export default HomeScreen;





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
          <View style={styles.cardInner}>
            <Text style ={styles.name}>{name}</Text>
            <Text style ={styles.breed}>{breeds.primary}</Text>
          </View>
      </ImageBackground>
  </View>
  );
};


//KIDS, VACCINATED
const BackCard = (props) => {
  const{name, breeds, description, age, gender, size, contact, attributes} = props.animal;
  return(
    <View style={styles.cardInner}>
      <Text style ={styles.name}>{name}</Text>
      <Text style ={styles.breed}>{breeds.primary}</Text>
      <Text style ={styles.text}>{description}</Text>
      <Text style ={styles.text}></Text>
      <Text style ={styles.text}>Phone: {contact.phone}</Text>
      <Text style ={styles.text}>Email: {contact.email}</Text>
      <Text style ={styles.text}></Text>
      <Text style ={styles.text}>Age: {age}</Text>
      <Text style ={styles.text}>Gender: {gender}</Text>
      <Text style ={styles.text}>Size: {size}</Text>
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
  
    cardFront: {
      width: '100%',
      height: '75%',
      borderRadius: 10,
  
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 1,
      shadowRadius: 16.00,
  
      elevation: 24,
      position: 'absolute',
      top: 50,
    },

    cardBack: {
      width: '90%',
      height: '70%',
      borderRadius: 10,
  
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 1,
      shadowRadius: 16.00,
  
      elevation: 24,
      position: 'absolute',
      backgroundColor: '#7271bf',
      top: 50,
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
