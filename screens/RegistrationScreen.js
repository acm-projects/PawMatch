import React, { useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';

const RegistrationScreen = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()

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
      .then((user) => {
        const fbRootRefFS = firebase.firestore();
        const userID = user.uid;
        console.log('user id is: ', userID)
        const userRef = fbRootRefFS.collection('users').doc(userID)
        userRef.set({
          email,
          password,
          firstName,
          lastName,
        })
        console.log('User account created & signed in!');
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
    <View>
      <Text style={styles.title}>Register</Text>
      <View  style={styles.inputContainer}>
        <TextInput 
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="New Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.button}>
        <Button title="Register" onPress={createUserAccount} color="#6867ac"/>
      </View>
      <View style={styles.button}>
        <Button title="Back" onPress={navLoginScreen} color="#919A8C"/>
      </View>
    </View>
  );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 20,
    textAlign: 'center',
    color: '#6867ac',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFBCD1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
    width: 300,
  },
  button: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
}) 
