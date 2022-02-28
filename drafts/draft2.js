import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';


function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged (user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
      /*
      <View style={styles.container}>
        <Text>Login</Text>
        <View>
          <TextInput 
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View>
          <Button title="Login" style={styles.button}/>
          <Button title="Google Login" style={styles.button}/>
        </View>
      </View> */
    );
  }

  return (
    <View  style={styles.container}>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default function App() {
  return (
    <LoginApp/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  button: {
    marginBottom: 10,
  },
})