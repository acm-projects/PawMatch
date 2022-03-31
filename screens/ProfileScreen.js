import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import UserModal from './UserModal';
import userChoices from './UserInterest';
import NewCh from './NewCh';
//import animals from '../data/animals';
//import arr from '/NewCh'

{
  /* TODO
1) add functionality to interests 
*/
}

const ProfileScreen = ({navigation}) => {
  console.log(userChoices);
  function logoutUser() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.replace('Login');
  }

  {
    /*function display() {
      
    return userChoices.map((item) => {
        return (
            <Text>
                {userChoices[0]}
            </Text>
        );
      });
  }*/
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff2f7'}}>
      <ScrollView>
        <View style={{width: 400, height: 110, flex: 1, flexDirection: 'row'}}>
          {/*View Profile Pic*/}
          <Image
            style={styles.userImg}
            source={{
              uri: 'https://media.istockphoto.com/photos/mature-beautiful-woman-with-red-hair-picture-id1221755378?k=20&m=1221755378&s=612x612&w=0&h=rZkb0wrSR4-Qfl-MIDbD8_2L_V2KYWOf0P_EqUveAAA=',
            }}
          />

          {/*View Info About User*/}
          <Text style={styles.userName}>Mary Smith</Text>
        </View>

        {/*View Interest*/}
        <View
          style={{
            width: 400,
            height: 50,
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={styles.interestsAndAdoptionsTitles}>Your Interests</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.tile}>
            <Text style={styles.text}>Hamsters</Text>
          </View>

          <View style={styles.tile}>
            <Text style={styles.text}>Dogs</Text>
          </View>

          <View style={styles.tile}>
            <Text style={styles.text}>Cats</Text>
          </View>

          <View style={styles.addTile}>
            <Text style={styles.text}>+</Text>
          </View>
        </View>

        <NewCh />

        <UserModal />

        {/*<Tiles animal = {userChoices[0]} />*/}

        {/*<View style={styles.container}>
            {userChoices.map(i => 
              (<Text key={i.id} animal = {i} />
              )
            )}  
            </View>*/}

        <View style={styles.container}>
          {/*Log Out Button*/}
          <TouchableOpacity
            style={{
              height: 100,
              width: 350,
              marginLeft: 20,
              marginRight: 20,
              justifyContent: 'center',
              borderRadius: 100,
            }}>
            <Button color="#6867ac" title="Log Out" onPress={logoutUser} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const Tiles = props => {
  const {key} = props.userChoice;
  return (
    <View>
      <Text style={styles.text}>{key}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: '#6867AC',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: '#6867AC',
  },
  interestsAndAdoptionsTitles: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: '#6867AC',
  },
  tile: {
    backgroundColor: '#FFBCD1',
    width: '40%',
    height: 40,
    padding: 10,
    margin: 10,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 20,
    elevation: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#6867AC',
  },
  addTile: {
    backgroundColor: '#FFBCD1',
    width: 48,
    height: 40,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    elevation: 10,
  },
  adoptionTile: {
    backgroundColor: '#FFBCD1',
    width: 170,
    height: 220,
    padding: 10,
    margin: 20,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 20,
    elevation: 10,
  },
  adoptionImg: {
    width: 135,
    height: 135,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 7,
    borderWidth: 3,
    marginBottom: 10,
    borderColor: '#6867AC',
  },
  adopText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#CE7BB0',
  },
  MainContainer: {
    flex: 1,
    margin: 10,
  },
  TextStyle: {
    fontSize: 25,
    textAlign: 'center',
  },
});

