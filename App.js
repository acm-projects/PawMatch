/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabScreen from './screens/MainTabScreen';

import LoginScreen from './screens/WelcomePages/LoginScreen';
import RegistrationScreen from './screens/WelcomePages/RegistrationScreen';
import WelcomeScreen from './screens/WelcomePages/WelcomeScreen';
import InfoScreen from './screens/WelcomePages/InfoScreen';
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {

  const initialState = {
    isLoading: true,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
        };
      
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
        };

      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
        };

      case 'REGISTER':
        return {
          ...prevState,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialState);


/*

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  const useEffect = (() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={styles.animation}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }*/


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        // headerStyle: {
        // backgroundColor: 'pink',
        // },
        // headerTintColor: 'white',
        // headerTitleStyle: {
        //     fontWeight: 'bold',
        // },
        // headerTitleAlign: 'left',
        headerShown: false,
    }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="PawMatch" component={MainTabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}



const styles = StyleSheet.create({
  animation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default App;