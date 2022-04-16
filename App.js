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

const Stack = createNativeStackNavigator();

const App = () => {
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

export default App;