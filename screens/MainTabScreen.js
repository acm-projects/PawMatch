import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import LikedScreen from './LikedScreen';
import ShelterScreen from './ShelterScreen';
import ProfileScreen from './ProfileScreen';
import AnimalTile from './AnimalTile';

const Tab = createMaterialBottomTabNavigator();
const LikedStack = createNativeStackNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'pink' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Shelters"
        component={ShelterScreen}
        options={{
          tabBarLabel: 'Shelters',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="LikedStack"
        component={LikedStackScreen}
        options={{
          tabBarLabel: 'Liked',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);


export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
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
    <ShelterStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: 'pink',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}>
        <ShelterStack.Screen name="Shelters" component={ShelterScreen} />
    </ShelterStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
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
