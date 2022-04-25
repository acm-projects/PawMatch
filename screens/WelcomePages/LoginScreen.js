import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Logo from '../../icons/pawlogo.png';

const LoginScreen = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePass, setHidePass] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      navigation.replace('PawMatch');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function signinUser() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  function navRegistrationScreen() {
    navigation.replace('Register');
  }

  if (initializing) return null;

  return (
    //if user is logged in, shows HomeScreen
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.topContainer, styles.containerElevation]}>
        <Image source={Logo} style={{width: 390, height: 390}} />
      </View>

      <View style={styles.bottomContainer}>
        <View style={{marginTop: 20}}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={[styles.input, styles.elevationInput, styles.inputText]}
              keyboardType={'email-address'}
            />
            <TextInput
              placeholder="password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={[styles.input, styles.elevationInput, styles.inputText]}
              secureTextEntry={hidePass ? true : false}
            />
          </View>
          <View style={{marginLeft: 65, marginTop: -10}}>
            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
              {hidePass == true ? (
                <View style={styles.CheckedBox} />
              ) : (
                <View style={styles.unCheckedBox} />
              )}
              {hidePass == true ? (
                <Text style={styles.passwordButtonText}>Show Password</Text>
              ) : (
                <Text style={styles.passwordButtonText}>Hide Password</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={signinUser} style={styles.signInButton}>
              <Text style={styles.buttonText}>Go!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={navRegistrationScreen}
              style={styles.registerButton}>
              <Text style={styles.buttonText}>Create An Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 53,
    margin: 20,
    textAlign: 'center',
    marginTop: 228,
    color: '#fb5555',
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#FFD6E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 290,
  },
  inputText: {
    fontSize: 18,
    color: '#727272',
  },
  inputContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elevationInput: {
    elevation: 10,
    shadowColor: '#898989',
  },
  buttonContainer: {
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerElevation: {
    elevation: 25,
    shadowColor: '#898989',
  },
  topContainer: {
    flex: 0.43,
    backgroundColor: '#F9F7F7',
  },
  bottomContainer: {
    flex: 0.57,
    backgroundColor: '#FFFFFF',
  },
  signInButton: {
    height: 35,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D0365F',
    borderRadius: 10,
    marginBottom: 5,
  },
  registerButton: {
    height: 35,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF759E',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordButtonText: {
    color: '#9C9C9C',
    fontSize: 14,
    marginLeft: 25,
    marginTop: -23,
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
});
