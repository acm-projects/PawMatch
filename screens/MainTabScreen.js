import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Image} from 'react-native';
import HomeScreen from './HomeScreen';
import LikedScreen from './LikedScreen';
import ShelterScreen from './SearchPage/ShelterScreen';
import ProfileScreen from './ProfileScreen';
import AnimalTile from './AnimalTiles/AnimalTile';
import AnimalTile2 from './AnimalTiles/AnimalTile2';
import InfoScreen from './WelcomePages/InfoScreen';
import pawImage from '../icons/2.png';
import likeImage from '../icons/12.png';
import userImage from '../icons/3.png';
import searchImage from '../icons/4.png';

const Tab = createMaterialBottomTabNavigator();
const LikedStack = createNativeStackNavigator();
const ShelterStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const MainTabScreen = () => (

  <Tab.Navigator
    initialRouteName="Feed"
    activeColor="#F9E5E9"
    inactiveColor='#F6D3D9'
    barStyle={{backgroundColor: '#ED7185'}}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name={"home-variant-outline"} size={26} color={color}/>
          // <Image source={pawImage} style={{width: 45, height: 20}} />
        ),
      }}
    />
    <Tab.Screen
      name="SheltersStack"
      component={ShelterStackScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name={"magnify"} size={26} color={color}/>
          // <Image source={searchImage} style={{width: 45, height: 20}} />
        ),
      }}
    />
    <Tab.Screen
      name="LikedStack"
      component={LikedStackScreen}
      options={{
        tabBarLabel: 'Liked',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name={"heart-outline"} size={26} color={color}/>
          // <Image source={likeImage} style={{width: 45, height: 20}} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name={"account-outline"} size={26} color={color}/>
          // <Image source={userImage} style={{width: 45, height: 20}} />
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
  <ProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="Info" component={InfoScreen} />
    
  </ProfileStack.Navigator>
);
