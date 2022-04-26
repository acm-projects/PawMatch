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
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import UserModal from './UserModal';
// import userChoices from './UserInterest';
import xImage from '../icons/x.png'
import bretman from '../icons/bretman.jpg';

import { call } from 'react-native-reanimated';

const ProfileScreen = ({navigation}) => {
  function logoutUser() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.replace('Login');
  }

  function FAQTravel() {
    navigation.replace('Info')
  }

  
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [address, setAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();
  const {uid} = auth().currentUser;

  const handleShow = () => {
    setShow(!show);
  }

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

  function editAccount() {
    const user = firebase.auth().currentUser;
    const userID = user.uid;
    firestore().collection('users').doc(userID).update({phoneNum})
  }
  var imaged = user?.images;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{width: 400, height: 110, flex: 1, flexDirection: 'row'}}>
          {/*View Profile Pic*/}
          <Image
            style={styles.userImg}
            source={bretman}
            // uri: 'https://media.istockphoto.com/photos/mature-beautiful-woman-with-red-hair-picture-id1221755378?k=20&m=1221755378&s=612x612&w=0&h=rZkb0wrSR4-Qfl-MIDbD8_2L_V2KYWOf0P_EqUveAAA=',

          />

          {/*View Info About User*/}
          <View>
            { user?.firstName != undefined && user?.lastName != undefined
            ? (<Text style={styles.userName}>Hi {user && user?.firstName + ' ' + user?.lastName}!</Text>)
            : (<Text style={styles.userName}>Welcome to Pawmatch!</Text>)
            }
          </View>
          
          
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfo}>{user?.email}</Text>
          <View style={{position: 'absolute', top: 21}}>
            { user?.phoneNum == undefined || show
            ? (<View >
              { show
              ? (<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                  <View style={styles.inputTextbox1}><TextInput 
                  onChangeText={phoneNum => {setPhoneNum(phoneNum)}}
                  style={styles.inputTextboxText}
                  maxLength={13}
                  keyboardType={"phone-pad"}
                  /></View>
                  <TouchableOpacity style={{left: 133}}
                  onPress={() => {setShow(!show); editAccount()}}>
                    <MaterialCommunityIcons name={"check"} size={25}/>
                  </TouchableOpacity>
                </View>)
              // ? (<TextInput style={styles.userInfo} maxLength={12} keyboardType={"number-pad"}/>)
              : (<TouchableOpacity onPress={() => setShow(!show)}>
                <Text style={styles.userInfo}>Add phone number</Text>
              </TouchableOpacity>)
              }
              </View>

              )
            : (<TouchableOpacity onPress={() => setShow(!show)}>
                <Text style={styles.userInfo}>{user?.phoneNum}</Text>
              </TouchableOpacity>)
            }
          </View>
          {/* <View>
            { user?.address == undefined
            ? (<Text style={styles.userInfo}>Add address</Text>)
            : (<Text style={styles.userInfo}>Address: {user?.address}</Text>)
            }
    
          </View> */}
          
          {/* <TouchableOpacity style={styles.editProfileButton} onPress={() => setShow(!show)}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity> */}
        </View>

        {/* <Modal visible={show} transparent={true}>
            <View style={styles.editProfileModalBackground}>
              <View style={styles.editProfileModalContainer}>
                <Text style={styles.modalTextHeader}>Edit Profile</Text>
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Image source={xImage} style={styles.xout}/>
                </TouchableOpacity>
                <View style={styles.inputTextbox1}>
                  <TextInput 
                  placeholder='Phone #'
                  onChangeText={phoneNum => {setPhoneNum(phoneNum)}}
                  style={styles.inputTextboxText}
                  maxLength={13}
                  keyboardType={"phone-pad"}
                  />
                </View>
                <View style={styles.inputTextbox2}>
                  <TextInput 
                  onChangeText={address => {setAddress(address)}}
                  style={styles.inputTextboxText}
                  placeholder='Address Line 1'
                  />
                </View>
                <View style={styles.inputTextbox2}>
                  <TextInput 
                  onChangeText={address => {setAddress(address)}}
                  style={styles.inputTextboxText}
                  placeholder='Address Line 2'
                  />
                </View>
                
                <TouchableOpacity style={styles.editProfileModalButton} onPress={() => {setShow(!show); editAccount()}}>
                  <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Submit</Text>
                </TouchableOpacity>
              </View>
              
            </View>
        </Modal> */}
        
        
        {/*View Interest*/}
        <View style={{width: 400, height: 50, marginTop: 40}}>
          <Text style={styles.interestsAndAdoptionsTitles}>Your Interests</Text>
        </View>
        <Interests/>
        <View style={{marginTop: -10}}>
          { user?.zipCode == null
          ? (<Text style={{marginLeft: 20, fontSize: 22}}>Add Zip Code</Text>)
          : (<Text style={{marginLeft: 20, fontSize: 22}}>Searching in {user && user?.zipCode}</Text>)
          }

          
          

          <View style={{marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
            { user && user?.userChoices == null
              ? (<View>
                  <Text style={{fontSize: 20}}>Add Interests to Display Here!</Text>
                  </View>)
              : (user && user?.userChoices.map(item => (
                <View style={styles.interestTile}>
                  <Text style={{fontSize: 23}}>{item}</Text>
                </View>
                ))
                )
            }
            
          </View>
        </View>
        {/* <View style={{marginLeft: 20}}><UserModal/></View> */}
        
        
        
      </ScrollView>
      <View style={{alignItems: 'center', position: 'absolute', bottom: 85, left: 57,}}>
          <TouchableOpacity style={styles.extraButtons} onPress={() => FAQTravel()}>
            <Text style={styles.extraButtonsText}>FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraButtons}>
            <Text style={styles.extraButtonsText}>Feedback</Text>
          </TouchableOpacity>
        </View>
      <TouchableOpacity style={{flex: 1, position: 'absolute', bottom: 20, left: 112}} onPress={logoutUser}>
        <View style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const Interests = () => {
  const type = [
    {id: 0, key: 'Dog', isChecked: false},
    {id: 1, key: 'Cat', isChecked: false},
    {id: 2, key: 'Rabbit', isChecked: false},
    {id: 3, key: 'Barnyard', isChecked: false},
    {id: 4, key: 'Bird', isChecked: false},
    {id: 5, key: 'Other', isChecked: false} 
  ];

  const dogBreed = [
    {id: 0, key: 'Goldendoodle', isChecked: false},
    {id: 1, key: 'Labradoodle', isChecked: false},
    {id: 2, key: 'Pomeranian', isChecked: false},
    {id: 3, key: 'Pug', isChecked: false},
    {id: 4, key: 'Samoyed', isChecked: false},
    {id: 5, key: 'Siberian Husky', isChecked: false},
    {id: 6, key: 'Tibetan Mastiff', isChecked: false},
    {id: 7, key: 'Yorkshire Terrier', isChecked: false},
  ];

  const catBreed = [
    {id: 0, key: 'Bengal', isChecked: false},
    {id: 1, key: 'Calico', isChecked: false},
    {id: 2, key: 'Exotic Shorthair', isChecked: false},
    {id: 3, key: 'Persian', isChecked: false},
    {id: 4, key: 'Siamese', isChecked: false},
    {id: 5, key: 'Siberian', isChecked: false},
    {id: 6, key: 'Sphynx / Hairless Cat', isChecked: false},
    {id: 7, key: 'Tabby', isChecked: false},
  ];

  const age = [
    {id: 0, key: 'Baby', isChecked: false},
    {id: 1, key: 'Young', isChecked: false},
    {id: 2, key: 'Adult', isChecked: false},
    {id: 3, key: 'Senior', isChecked: false},
  ];

  const gender = [
    {id: 0, key: 'Female', isChecked: false},
    {id: 1, key: 'Male', isChecked: false},
  ];

  const size = [
    {id: 0, key: 'Small', isChecked: false},
    {id: 1, key: 'Medium', isChecked: false},
    {id: 2, key: 'Large', isChecked: false},
  ];

  const coat = [
    {id: 0, key: 'Short', isChecked: false},
    {id: 1, key: 'Medium', isChecked: false},
    {id: 2, key: 'Long', isChecked: false},
    {id: 3, key: 'Hairless', isChecked: false},
    {id: 4, key: 'Curly', isChecked: false},
  ];

  const otherReqs = [
    {id: 0, key: 'Good with Children', isChecked: false},
    {id: 1, key: 'Good with Dogs', isChecked: false},
    {id: 2, key: 'Good with Cats', isChecked: false},
    {id: 3, key: 'House Trained', isChecked: false},
    {id: 4, key: 'Declawed', isChecked: false},
    {id: 5, key: 'Special Needs', isChecked: false},
  ];

  const handleChangeType = id => {
    var typeTemp = checkedType.map(searchType => {
      if (id === searchType.id) {
        return {...searchType, isChecked: !searchType.isChecked};
      }
      return searchType;
    });
    setCheckedType(typeTemp);
  };
  const handleChangeDogBreed = id => {
    var dogBreedTemp = checkedDogBreed.map(searchDogBreed => {
      if (id === searchDogBreed.id) {
        return {...searchDogBreed, isChecked: !searchDogBreed.isChecked};
      }
      return searchDogBreed;
    });
    setCheckedDogBreed(dogBreedTemp);
  };
  const handleChangeCatBreed = id => {
    var catBreedTemp = checkedCatBreed.map(searchCatBreed => {
      if (id === searchCatBreed.id) {
        return {...searchCatBreed, isChecked: !searchCatBreed.isChecked};
      }
      return searchCatBreed;
    });
    setCheckedCatBreed(catBreedTemp);
  };
  const handleChangeAge = id => {
    var ageTemp = checkedAge.map(searchAge => {
      if (id === searchAge.id) {
        return {...searchAge, isChecked: !searchAge.isChecked};
      }
      return searchAge;
    });
    setCheckedAge(ageTemp);
  };
  const handleChangeGender = id => {
    var genderTemp = checkedGender.map(searchGender => {
      if (id === searchGender.id) {
        return {...searchGender, isChecked: !searchGender.isChecked};
      }
      return searchGender;
    });
    setCheckedGender(genderTemp);
  };
  const handleChangeSize = id => {
    var sizeTemp = checkedSize.map(searchSize => {
      if (id === searchSize.id) {
        return {...searchSize, isChecked: !searchSize.isChecked};
      }
      return searchSize;
    });
    setCheckedSize(sizeTemp);
  };
  const handleChangeCoat = id => {
    var coatTemp = checkedCoat.map(searchCoat => {
      if (id === searchCoat.id) {
        return {...searchCoat, isChecked: !searchCoat.isChecked};
      }
      return searchCoat;
    });
    setCheckedCoat(coatTemp);
  };
  const handleChangeOtherReqs = id => {
    var otherReqsTemp = checkedOtherReqs.map(searchOtherReqs => {
      if (id === searchOtherReqs.id) {
        return {...searchOtherReqs, isChecked: !searchOtherReqs.isChecked};
      }
      return searchOtherReqs;
    });
    setCheckedOtherReqs(otherReqsTemp);
  };

  
  function callAPI(userChoices) {
    if (!(zipCode >= 501 && zipCode.length == 5)) {
      alert('You must enter a valid zipcode');
      console.log('Call Cancelled');
    } 
    else {
      userChoices = [];
      for (let i = 0; i < checkedType.length; i++) {
        if (checkedType[i].isChecked == true) {
          userChoices.push(checkedType[i].key);
        }
      }
      for (let i = 0; i < checkedDogBreed.length; i++) {
        if (checkedDogBreed[i].isChecked == true) {
          userChoices.push({key: checkedDogBreed[i].key});
        }
      }
      for (let i = 0; i < checkedCatBreed.length; i++) {
        if (checkedCatBreed[i].isChecked == true) {
          userChoices.push({key: checkedCatBreed[i].key});
        }
      }
      for (let i = 0; i < checkedAge.length; i++) {
        if (checkedAge[i].isChecked == true) {
          userChoices.push(checkedAge[i].key);
        }
      }
      for (let i = 0; i < checkedGender.length; i++) {
        if (checkedGender[i].isChecked == true) {
          userChoices.push(checkedGender[i].key);
        }
      }
      for (let i = 0; i < checkedSize.length; i++) {
        if (checkedSize[i].isChecked == true) {
          userChoices.push(checkedSize[i].key);
        }
      }
      for (let i = 0; i < checkedCoat.length; i++) {
        if (checkedCoat[i].isChecked == true) {
          userChoices.push({key: checkedCoat[i].key});
        }
      }
      for (let i = 0; i < checkedOtherReqs.length; i++) {
        if (checkedOtherReqs[i].isChecked == true) {
          userChoices.push({key: checkedOtherReqs[i].key});
        }
      }

      const user = firebase.auth().currentUser;
      const userID = user.uid;
      firestore().collection('users').doc(userID).update({userChoices, zipCode})
      editshowModal(!editShow);

    }
  };

  const [editShow, editshowModal] = useState(false);
  const [zipCode, setZipCode] = React.useState(zipCode);
  const [checkedType, setCheckedType] = useState(type);
  const [checkedDogBreed, setCheckedDogBreed] = useState(dogBreed);
  const [checkedCatBreed, setCheckedCatBreed] = useState(catBreed);
  const [checkedAge, setCheckedAge] = useState(age);
  const [checkedGender, setCheckedGender] = useState(gender);
  const [checkedSize, setCheckedSize] = useState(size);
  const [checkedCoat, setCheckedCoat] = useState(coat);
  const [checkedOtherReqs, setCheckedOtherReqs] = useState(otherReqs);
  return (
    <View style={{marginTop: 10,}}>
      <View>
        <TouchableOpacity style={styles1.editInterestsButton} onPress={() => editshowModal(!editShow)}>
          {/* <Text style={styles1.editInterestsButtonText}>Edit Interests</Text> */}
          <MaterialCommunityIcons name={"lead-pencil"} size={30} color={'white'}/>
        </TouchableOpacity>
      </View>
      <Modal visible={editShow} transparent={true}>
      <View style={styles1.modalBackground}>
        <View style={styles1.modalContainer}>
          <Text style={styles1.title}>Edit Interests</Text>
          <TouchableOpacity onPress={() => editshowModal(!editShow)}>
            <Image style={styles1.xout} source={xImage} />
          </TouchableOpacity>
          <View style={styles1.ZipCodeContainer}>
            <Text style={styles1.ZipCodeHeader}>Zip Code</Text>
            <View style={styles1.ZipCodeInputBox}>
              <TextInput
                onChangeText={zipCode => {
                  setZipCode(zipCode);
                }}
                value={zipCode}
                
                style={styles1.ZipCodeInputText}
                maxLength={5}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <View style={styles1.checkboxContainer}>
            <Text style={styles1.checkboxHeader}>Type</Text>
            <FlatList
              numColumns={2}
              data={checkedType}
              renderItem={({item}) => (
                <>
                  <View style={styles1.checkboxFormat}>
                    <TouchableOpacity
                      value={item.isChecked}
                      onPress={() => handleChangeType(item.id)}>
                      {item.isChecked == true ? (
                        <View style={styles1.CheckedBox} />
                      ) : (
                        <View style={styles1.unCheckedBox} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles1.checkboxText}>{item.key}</Text>
                  </View>
                </>
              )}
              contentContainerStyle={{margin: 20}}
            />
          </View>

          {/*<View style={styles1.checkboxContainer}>
              <Text style={styles1.checkboxHeader}>Dog Breeds</Text>
              <FlatList
                numColumns={2}
                data={checkedDogBreed}
                renderItem={({item}) => (
                  <>
                    <View style={styles1.checkboxFormat}>
                      <TouchableOpacity
                        value={item.isChecked}
                        onPress={() => handleChangeDogBreed(item.id)}>
                        {item.isChecked == true ? (
                          <View style={styles1.CheckedBox} />
                        ) : (
                          <View style={styles1.unCheckedBox} />
                        )}
                      </TouchableOpacity>
                      <Text style={styles1.checkboxText}>{item.key}</Text>
                    </View>
                  </>
                )}
                contentContainerStyle={{margin: 20}}
              />
            </View>

            <View style={styles1.checkboxContainer}>
              <Text style={styles1.checkboxHeader}>Cat Breeds</Text>
              <FlatList
                numColumns={2}
                data={checkedCatBreed}
                renderItem={({item}) => (
                  <>
                    <View style={styles1.checkboxFormat}>
                      <TouchableOpacity
                        value={item.isChecked}
                        onPress={() => handleChangeCatBreed(item.id)}>
                        {item.isChecked == true ? (
                          <View style={styles1.CheckedBox} />
                        ) : (
                          <View style={styles1.unCheckedBox} />
                        )}
                      </TouchableOpacity>
                      <Text style={styles1.checkboxText}>{item.key}</Text>
                    </View>
                  </>
                )}
                contentContainerStyle={{margin: 20}}
              />
                        </View>*/}

          <View style={styles1.checkboxContainer}>
            <Text style={styles1.checkboxHeader}>Age</Text>
            <FlatList
              numColumns={2}
              data={checkedAge}
              renderItem={({item}) => (
                <>
                  <View style={styles1.checkboxFormat}>
                    <TouchableOpacity
                      value={item.isChecked}
                      onPress={() => handleChangeAge(item.id)}>
                      {item.isChecked == true ? (
                        <View style={styles1.CheckedBox} />
                      ) : (
                        <View style={styles1.unCheckedBox} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles1.checkboxText}>{item.key}</Text>
                  </View>
                </>
              )}
              contentContainerStyle={{margin: 20}}
            />
          </View>

          <View style={styles1.checkboxContainer}>
            <Text style={styles1.checkboxHeader}>Gender</Text>
            <FlatList
              numColumns={2}
              data={checkedGender}
              renderItem={({item}) => (
                <>
                  <View style={styles1.checkboxFormat}>
                    <TouchableOpacity
                      value={item.isChecked}
                      onPress={() => handleChangeGender(item.id)}>
                      {item.isChecked == true ? (
                        <View style={styles1.CheckedBox} />
                      ) : (
                        <View style={styles1.unCheckedBox} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles1.checkboxText}>{item.key}</Text>
                  </View>
                </>
              )}
              contentContainerStyle={{margin: 20}}
            />
          </View>

          <View style={styles1.checkboxContainer}>
            <Text style={styles1.checkboxHeader}>Size</Text>
            <FlatList
              numColumns={2}
              data={checkedSize}
              renderItem={({item}) => (
                <>
                  <View style={styles1.checkboxFormat}>
                    <TouchableOpacity
                      value={item.isChecked}
                      onPress={() => handleChangeSize(item.id)}>
                      {item.isChecked == true ? (
                        <View style={styles1.CheckedBox} />
                      ) : (
                        <View style={styles1.unCheckedBox} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles1.checkboxText}>{item.key}</Text>
                  </View>
                </>
              )}
              contentContainerStyle={{margin: 20}}
            />
          </View>

          {/*<View style={styles1.checkboxContainer}>
              <Text style={styles1.checkboxHeader}>Coat</Text>
              <FlatList
                numColumns={2}
                data={checkedCoat}
                renderItem={({item}) => (
                  <>
                    <View style={styles1.checkboxFormat}>
                      <TouchableOpacity
                        value={item.isChecked}
                        onPress={() => handleChangeCoat(item.id)}>
                        {item.isChecked == true ? (
                          <View style={styles1.CheckedBox} />
                        ) : (
                          <View style={styles1.unCheckedBox} />
                        )}
                      </TouchableOpacity>
                      <Text style={styles1.checkboxText}>{item.key}</Text>
                    </View>
                  </>
                )}
                contentContainerStyle={{margin: 20}}
              />
            </View>

            <View style={styles1.checkboxContainer}>
              <Text style={styles1.checkboxHeader}>Other Requirements</Text>
              <FlatList
                numColumns={2}
                data={checkedOtherReqs}
                renderItem={({item}) => (
                  <>
                    <View style={styles1.checkboxFormat}>
                      <TouchableOpacity
                        value={item.isChecked}
                        onPress={() => handleChangeOtherReqs(item.id)}>
                        {item.isChecked == true ? (
                          <View style={styles1.CheckedBox} />
                        ) : (
                          <View style={styles1.unCheckedBox} />
                        )}
                      </TouchableOpacity>
                      <Text style={styles1.checkboxText}>{item.key}</Text>
                    </View>
                  </>
                )}
                contentContainerStyle={{margin: 20}}
              />
                        </View>*/}

          <TouchableOpacity onPress={() => callAPI()}>
            <View style={styles1.buttonContainer}>
              <Text style={styles1.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
      </View>
      </View>
    </Modal>
    </View>
    
  );
  
};

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
  logoutButton: {
    backgroundColor: '#E3406B',
    padding: 6,
    width: 160,
    borderRadius: 12,
    justifyContent: 'center'
  },
  logoutButtonText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginTop: 15,
    marginLeft: 9,
    borderWidth: 3,
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    color: '#D32D61',
  },
  userInfo: {
    color: '#7C7C7C',
    fontSize: 16,
  },
  userInfoContainer: {
    marginTop: -61, 
    marginLeft: 120, 
  },
  interestsAndAdoptionsTitles: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    left: 12,
    color: '#DA3C6D',
  },
  interestTile: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 3,
    marginRight: 10,
    padding: 2,
    paddingLeft: 9,
    width: 110,
    justifyContent: 'center',
  },
  xout: {
    width: 15,
    height: 15,
    marginLeft: 250,
    marginTop: -43
  },
  editProfileText: {
    color: 'white',
    fontSize: 15,
  },
  editProfileButton: {
    backgroundColor: 'grey',
    width: 90,
    height: 25,
    borderRadius: 12,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileModalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
  },
  editProfileModalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    marginVertical: 230,
    paddingHorizontal: 0,
    padding: 25,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
  },
  modalTextHeader: {
    textAlign: 'center',
    fontSize: 30,
  },
  inputTextbox1: {
    borderColor: '#969696',
    borderWidth: 2,
    borderRadius: 7,
    height: 25,
    width: 130,
    position: 'absolute',
    top: 2,

  },
  inputTextbox2: {
    borderColor: '#969696',
    borderWidth: 2,
    borderRadius: 7,
    height: 35,
    width: 270,
    marginLeft: 10,
    marginVertical: 2,
    marginBottom: 6,
  },
  inputTextboxText: {
    fontSize: 15,
    color: '#8E8E8E',
    marginVertical: -12,
    marginRight: 1,
  },
  editProfileModalButton: {
    backgroundColor: '#fb5555',
    width: 90,
    height: 32,
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
  },
  extraButtons: {
    elevation: 10,
    backgroundColor: '#F6CED8',
    alignItems: 'center',
    borderRadius: 15,
    width: 250,
    margin: 8,
    padding: 10,
  },
  extraButtonsText: {
    color: '#A05569',
    fontSize: 22,
  },
});

const styles1 = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 30,
    marginBottom: 20,
    padding: 25,
    borderRadius: 30,
    flex: 1,
  },
  title: {
    fontWeight: '900',
    margin: 8,
    marginTop: -0.5,
    marginBottom: 10,
    fontSize: 37,
    color: '#E24E67',
    alignSelf: 'center'
  },
  xout: {
    width: 15,
    height: 15,
    marginLeft: 265,
    marginTop: -62
  },
  checkboxText: {
    fontSize: 20,
    color: '#8E8E8E',
  },
  unCheckedBox: {
    borderColor: '#969696',
    borderWidth: 2,
    borderRadius: 7,
    height: 20,
    width: 20,
    marginRight: 6,
    marginVertical: 3,
  },
  CheckedBox: {
    borderColor: '#969696',
    backgroundColor: '#C4C4C4',
    borderWidth: 2,
    borderRadius: 7,
    height: 20,
    width: 20,
    marginRight: 6,
    marginVertical: 3,
  },
  checkboxFormat: {
    flexDirection: 'row',
    flex: 1,
  },
  editInterestsButton: {
    backgroundColor: '#E3406B',
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    left: 182,
    top: -48,
    position: 'absolute',
    padding: 1,
    
    
  },
  editInterestsButtonText: {
    color: 'white',
  },
  ZipCodeContainer: {
    flexDirection: 'row',
  },
  ZipCodeHeader: {
    color: '#6B6B6B',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: -3,
    marginBottom: 5,
  },
  ZipCodeInputBox: {
    borderColor: '#969696',
    borderWidth: 2,
    borderRadius: 7,
    height: 30,
    width: 140,
    marginLeft: 10,
    marginVertical: 2,
  },
  ZipCodeInputText: {
    fontSize: 18,
    color: '#8E8E8E',
    marginVertical: -9,
    marginRight: 1,
    alignSelf: 'center',
  },
  checkboxHeader: {
    color: '#6B6B6B',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: -15,
  },
  checkboxContainer: {
    margin: -5,
    marginHorizontal: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#DE5B71',
    marginVertical: 15,
    marginHorizontal: 80,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  button: {
    marginBottom: 60,
    marginTop: 20,
  },
});

