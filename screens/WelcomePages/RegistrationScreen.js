import React, { useState, useEffect} from 'react';
import { View, Text, Button, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegistrationScreen = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [imageUriGallery, setimageUriGallergy] = useState();
  const [hidePass, setHidePass] = useState(false);

  const openGallery = () => {
     const options = {
       storageOptions: {
         path: 'images',
         mediaType: 'photo',
        },
        includeBase64: true,
     };
     
     launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.eror) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: 'data:image/jepg;base64' + response.base64};
        setimageUriGallergy(source);
      }
     })

  }

  function handleImage() {
    openGallery(() => {
      console.log('hello')
    })
  }

  const uploadImagetoStorage = (path) => {
    let reference = storage().ref(imageUriGallery);        
    let task = reference.putFile(path);               

    task.then(() => {                                 
        console.log('Image uploaded to the bucket!');
    }).catch((e) => console.log('uploading image error => ', e));
  }

  // const handlePasswordVisibility = () => {
  //   if (rightIcon === eye) {
  //     setRightIcon(hiddenEye);
  //     setPasswordVisibility(!passwordVisibility);
  //   } else if (rightIcon === hiddenEye) {
  //     setRightIcon(eye);
  //     setPasswordVisibility(!passwordVisibility);
  //   }
  // };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      navigation.replace("Welcome")
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  
  function createUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
      const user = firebase.auth().currentUser;
      const userID = user.uid;
      console.log(userID);
      firestore().collection('users').doc(userID).set({
        email, 
        password,
        firstName,
        lastName,
      })
        

          .then(() => {
            console.log('User account created & signed in!');
          });
      
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
  
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
  
        console.error(error);
      });
  }

  function navLoginScreen() {
    navigation.replace("Login")
  }

  if (initializing) return null;


  return ( 
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 100}}>
      <Text style={styles.title}>Register</Text>
      
      <TouchableOpacity style={[styles.choosePhoto, styles.elevation]} onPress={()=>{handleImage()}}>
            <Text style={styles.choosePhotoText}>Choose Profile Photo</Text>
      </TouchableOpacity>
      
      <View style={{marginTop: -95}}>
        <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={[styles.input1, styles.elevationInput, styles.inputText]}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={[styles.input1, styles.elevationInput, styles.inputText]}
          />
      </View>
    <View style={{alignItems: 'center'}}>
      <TextInput 
          placeholder="Email"
          keyboardType={'email-address'}
          value={email}
          onChangeText={text => setEmail(text)}
          style={[styles.input2, styles.elevationInput, styles.inputText]}
        />
        <TextInput
          placeholder="New Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={[styles.input2, styles.elevationInput, styles.inputText]}
          secureTextEntry={hidePass ? true : false} 
        />
        
    </View>
    <View style={{marginLeft: 50, marginTop: -5,}}>
            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
              { hidePass == true
              ? (<View style={styles.CheckedBox} />)
              : (<View style={styles.unCheckedBox} />)
              }
              {
                hidePass == true
              ? (<Text style={styles.passwordButtonText}>Show Password</Text>)
              : (<Text style={styles.passwordButtonText}>Hide Password</Text>)
              }
              
            </TouchableOpacity>
        </View>
    
    <View style={styles.button}>
          <TouchableOpacity onPress={createUserAccount} style={styles.registerButton}>
            <Text style={styles.button1Text}>Let's Go!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navLoginScreen} style={styles.backButton}>
              <Text style={styles.button2Text}>I already have an account</Text>
          </TouchableOpacity>
      
    </View>

      </View>
        
    </SafeAreaView>
  );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 30,
    textAlign: 'center',
    color: '#D0365F',
    fontWeight: '800',
  },
  input1: {
    backgroundColor: '#FFD6E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 125,
    marginBottom: 10,
    width: 230,
  },
  input2: {
    backgroundColor: '#FFD6E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 320,
  },
  inputText: {
    fontSize: 18,
    color: '#727272'
  },
  elevationInput: {
    elevation: 10,
    shadowColor: '#898989',
  },
  button: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosePhoto: {
    width: 90,
    height: 90,
    backgroundColor: '#FA7A9C',
    borderColor: '#F86E92',
    justifyContent: 'center',
    borderWidth: 5,
    borderRadius: 35,
    marginHorizontal: 27,
  },
  choosePhotoText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input1Container: {
    marginTop: -10,
  },
  registerButton: {
    height: 40,
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D0365F',
    borderRadius: 10,
    marginBottom: 5,
  },
  backButton: {
    height: 35,
    width: 235,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF759E',
    borderRadius: 10,
  },
  button1Text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  button2Text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  unCheckedBox: {
    borderColor: '#969696',
    borderWidth: 2,
    borderRadius: 7,
    height: 18,
    width: 18,
    marginRight: 6,
    marginVertical: 3,
},
CheckedBox: {
    borderColor: '#969696',
    backgroundColor: '#C4C4C4',
    borderWidth: 2,
    borderRadius: 7,
    height: 18,
    width: 18,
    marginRight: 6,
    marginVertical: 3,
},
passwordButtonText: {
  color: '#9C9C9C',
  fontSize: 14,
  marginLeft: 25,
  marginTop: -23,
},
}) 
