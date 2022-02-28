import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

function LoginView() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function signinUser() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
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

  return (
    <View>
        <Text style={styles.title}>PawMatch</Text>
        <View  style={styles.inputContainer}>
          <TextInput 
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.button}>
        <Button color="#6867ac" title="Sign In" onPress={signinUser}/>
        </View>
        <View style={styles.button}>
        <Button color="#6867ac" title=" Google Sign In"/>
        </View>
        
      </View>
  );
}




function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function SignoutView() {
    return (
      <View>
        <Text style={styles.homepage}>Welcome {user.email}</Text>
        <Button color="#6867ac" title="Log Out" onPress={logoutUser} />
      </View>
    );
  }

  if (initializing) return null;

  if (!user) {
    return (
      <LoginView/>
    );
  }

  return (
    <SignoutView/>
  );
}




function logoutUser(){
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}




export default function App() {
    return (
      <View>
        <LoginApp/>
      </View>
    );
  
}




const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 20,
    textAlign: 'center',
    color: '#fb5555',
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
  homepage: {
    fontSize: 25,
    margin: 30,
    fontWeight: 'bold',
    color: '#fb5555',
  },
})