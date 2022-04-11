import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import UserModal from './UserModal';
import userChoices from './UserInterest';

const ProfileScreen = ({navigation}) => {
  console.log(userChoices);
  function logoutUser() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.replace('Login');
  }

  const [user, setUser] = useState();
  const {uid} = auth().currentUser;

  const getUser = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(uid)
        .get();

      const userData = documentSnapshot.data();
      setUser(userData);
    } catch {

    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
          <Text style={styles.userName}>Hi {user && user?.firstName + ' ' + user?.lastName}!</Text>
          
        </View>
        <View style={styles.userInfoContainer}>
          <View>
            { user?.phoneNum == undefined
            ? (<Text style={styles.userInfo}>Add phone number</Text>)
            : (<Text style={styles.userInfo}>Phone Number: {user?.phoneNum}</Text>)
            }
          </View>
          <View>
            { user?.address == undefined
            ? (<Text style={styles.userInfo}>Add address</Text>)
            : (<Text style={styles.userInfo}>Address: {user?.address}</Text>)
            }
    
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
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

        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 20}}>Searching in {user && user?.zipCode}</Text>
          { user?.userChoices.map(item => (
            <View >
              <Text style={{fontSize: 20}}>{item}</Text>
            </View>
          ))
          
          }
          {/* <FlatList 
            numColumns={2}
            data={user?.userChoices}
            renderItem={({item}) => (
              <>
              <View>
                <Text style={{fontSize: 20}}>{item}</Text>
              </View>
              </>
            )}
            scrollEnabled
            contentContainerStyle={{justifyContent: 'space-around'}}
          /> */}
          {/* <Text>{user && user?.userChoices}</Text> */}
          <UserModal />
        </View>

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

// const Tiles = props => {
//   const {key} = props.userChoice;
//   return (
//     <View>
//       <Text style={styles.text}>{key}</Text>
//     </View>
//   );
// };

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
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: '#6867AC',
  },
  userInfo: {
    color: '#6867AC',
    fontSize: 16,
  },
  userInfoContainer: {
    marginTop: -65, 
    marginLeft: 120, 
  },
  interestsAndAdoptionsTitles: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: '#6867AC',
  },
  editProfileText: {
    color: 'white',
    fontSize: 15,
  },
  editProfileButton: {
    backgroundColor: 'grey',
    width: 90,
    height: 25,
    borderRadius: 10,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // tile: {
  //   backgroundColor: '#FFBCD1',
  //   width: '40%',
  //   height: 40,
  //   padding: 10,
  //   margin: 10,
  //   marginLeft: 5,
  //   marginTop: 5,
  //   borderRadius: 20,
  //   elevation: 10,
  // },
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
  // adoptionTile: {
  //   backgroundColor: '#FFBCD1',
  //   width: 170,
  //   height: 220,
  //   padding: 10,
  //   margin: 20,
  //   marginTop: 10,
  //   marginLeft: 10,
  //   borderRadius: 20,
  //   elevation: 10,
  // },
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
  interestText: {
    fontSize: 12,
  }
});

