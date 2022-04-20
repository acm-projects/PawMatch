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
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: 'pink',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTitleAlign: 'left',
    }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
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