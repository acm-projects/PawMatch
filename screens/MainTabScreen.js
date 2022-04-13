import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Image} from 'react-native';
import HomeScreen from './HomeScreen';
import LikedScreen from './LikedScreen';
import ShelterScreen from './ShelterScreen';
import ProfileScreen from './ProfileScreen';
import AnimalTile from './AnimalTile';
import AnimalTile2 from './AnimalTile2';
import pawImage from './2.png';
import likeImage from './12.png';
import userImage from './3.png';
import searchImage from './4.png';

const Tab = createMaterialBottomTabNavigator();
const LikedStack = createNativeStackNavigator();
const ShelterStack = createNativeStackNavigator();

const MainTabScreen = () => (

  <Tab.Navigator
    initialRouteName="Feed"
    activeColor="#A267AC"
    barStyle={{backgroundColor: 'pink'}}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => (
          <Image source={pawImage} style={{width: 45, height: 20}} />
        ),
      }}
    />
    <Tab.Screen
      name="SheltersStack"
      component={ShelterStackScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({color}) => (
          <Image source={searchImage} style={{width: 45, height: 20}} />
        ),
      }}
    />
    <Tab.Screen
      name="LikedStack"
      component={LikedStackScreen}
      options={{
        tabBarLabel: 'Liked',
        tabBarIcon: ({color}) => (
          <Image source={likeImage} style={{width: 45, height: 20}} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) => (
          <Image source={userImage} style={{width: 45, height: 20}} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'pink',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

const LikedStackScreen = ({navigation}) => (
  <LikedStack.Navigator screenOptions={{headerShown: false}}>
    <LikedStack.Screen name="Liked" component={LikedScreen} />
    <LikedStack.Screen name="Tile" component={AnimalTile} />
  </LikedStack.Navigator>
);

const ShelterStackScreen = ({navigation}) => (
    <ShelterStack.Navigator screenOptions={{headerShown: false}}>
        <ShelterStack.Screen name="Shelters" component={ShelterScreen} />
        <LikedStack.Screen name="Tile2" component={AnimalTile2} />
    </ShelterStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'pink',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);
