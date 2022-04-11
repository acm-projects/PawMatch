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
  const{name, image, breed, bio} = props.animal;
  return(
  <View style={styles.cardFront}>
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


const BackCard = (props) => {
  const{name, breed, age, gender, size} = props.animal;
  return(
    <View style={styles.cardInner}>
      <Text style ={styles.name}>{name}</Text>
      <Text style ={styles.breed}>{breed}</Text>
      <Text style ={styles.age}>Age: {age}</Text>
      <Text style ={styles.gender}>Gender: {gender}</Text>
      <Text style ={styles.size}>Size: {size}</Text>
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

    age: {
      fontSize: 20,
      color: 'white',
    },

    gender: {
      fontSize: 20,
      color: 'white',  
    },

    size: {
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
