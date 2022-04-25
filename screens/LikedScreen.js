import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
  Modal,
  LogBox,
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import backArrowImage from '../icons/11.png';
var petfinder = require('@petfinder/petfinder-js');
//var client = new petfinder.Client({apiKey: "BW2quofQcKQRW8zaW5nxGCLiYxvlnYPZWfoWhD19EMp9oHbmjJ", secret: "zrA4VcQo24kvI21xAZjE6Ok8ZD6EZjEQ3JPBJ6hA"});
//var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});
var client = new petfinder.Client({
  apiKey: 'P2a91yMjApUn8QYGc6OCutLXCYx4DRZuXHusdWQZxT3FDLkVqr',
  secret: 'M4e9kQONsJUK8xDUah65CWNMwdmyRrK2llgXD8qQ',
});

var likedAnimals = [55083515, 55083513, 55083530];
//55083515, 55083513, 55083530]
var likedAnimalsData = [];
LogBox.ignoreAllLogs();
const LikedScreen = ({navigation}) => {
  // const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  
  animalKey = 0;

  // function getAnimals(animalData) {
  //   if (isLoading) {
      
  //     for (var i = 0; i < animalData.length; i++) {
  //       client.animal.show(animalData[i]).then(function (response) {
  //         likedAnimalsData.push(response.data.animal);
  //         setApiData(likedAnimalsData);
  //         //console.log(resp.data.animal.name);
  //       });
        
  //     }
  //     setLoading(false);
  //   }
  // }


  // getAnimals(likedAnimals);
  // //console.log(apiData);

  var list = [];
  var list2 = [];
  const [likedData, setLikedData] = useState([])
  const [superLikedData, setSuperLikedData] = useState([])
  const {uid} = auth().currentUser;
  const getLiked = async () => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(uid)
        .collection('liked')
        .get()
    //     .then(collectionSnapshot => {
    //       console.log('Total liked: ', collectionSnapshot.size);
    // });
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setLikedData([...list]);
        
    } catch {

    }
  };

  useEffect(() => {
    getLiked();
  }, []);

  const getSuperLiked = async () => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(uid)
        .collection('superLiked')
        .get()
    //     .then(collectionSnapshot => {
    //       console.log('Total liked: ', collectionSnapshot.size);
    // });
        snapshot.forEach((doc) => {
          list2.push(doc.data());
        });
        setSuperLikedData([...list2]);
        
    } catch {

    }
  };

  useEffect(() => {
    getSuperLiked();
  }, []);
  

  


  function output() {
    likedData.map(item => {
      console.log(item.animalcard.size);
    })
    
  }

  const Tile = props => {
    // function expandTile() {
    //   navigation.replace('Tile', {paramKey: props});
    // }
    
    const {
      id, name, breeds, primary_photo_cropped,
      type, age, gender,
      size, status, contact,
      attributes, species, description
    } = props.i;
    var animalcard = [];
    animalcard = props.i;
    var image;
    if (primary_photo_cropped === null) {
      if (type === 'Dog') {
        image =
          'https://i.pinimg.com/564x/43/7a/9d/437a9d58adfe0b277efc3d6906d6a55c.jpg';
      } else if (type === 'Cat') {
        image =
          'https://i.pinimg.com/564x/ad/f8/de/adf8dea81bb563653fca398ce4d53040.jpg';
      } else if (type == 'Bird') {
        image =
          'https://i.pinimg.com/564x/66/4c/45/664c45cf13a13b3a3c57fe6f2e3149cb.jpg';
      } else if (type === 'Barnyard') {
        image =
          'https://i.pinimg.com/564x/ae/bd/81/aebd81411b57b56353edbf2f50616f52.jpg';
      } else {
        image =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
      }
    } else {
      image = primary_photo_cropped.small;
    }

    const [cardVisible, setCardVisible] = useState(false);
    function handleVisibility() {
      setCardVisible(!cardVisible);
    }
    const [like, setLike] = useState(true);
    const storeLike = () => {
      const user = firebase.auth().currentUser;
      const userID = user.uid;
      setLike(!like);
      let Id = (id).toString();
      if (like) {
        firestore().collection('users').doc(userID).collection('liked').doc(Id).delete()
      } else if (!like) {
        setLikeOptionVisible(true);
        // <likeOption/>
        if (like) {
          setLikeOptionVisible(false);
          setLike(true);
        } else {
          firestore().collection('users').doc(userID).collection('liked').doc(Id).set({animalcard})
        }
      }
      
    }
    const [likeOptionVisible, setLikeOptionVisible] = useState(false);
    if (likeOptionVisible) {
      return (
        <Modal transparent={true} visible={likeOptionVisible} style={styles.likeOption}>
          <View style={styles.likeOptionBackground}>
            <View style={styles.likeOption}>
              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Are you sure you want to dislike?</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={[setLikeOptionVisible(!likeOptionVisible), setLike(false)]}>
                  <View style={[styles.buttons, {backgroundColor: '#FF478E'}]}>
                    <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>Yes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={[setLikeOptionVisible(!likeOptionVisible), setLike(true)]}>
                  <View style={[styles.buttons, {backgroundColor: '#85FF54'}]}>
                    <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>No</Text>
                  </View>
                </TouchableOpacity>
               
              </View>
            </View>
          </View>
        </Modal>
      )
    }

    if (cardVisible) {
      return (
        <Modal visible={true} style={{flex: 1, backgroundColor: '#FFF7FA'}}>
              <View style={styles2.tile}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableOpacity onPress={() => handleVisibility()}>
                    {/* <Image source={backArrowImage} style={styles2.back} /> */}
                    <MaterialCommunityIcons name={"arrow-left-circle"} size={35} color={'white'}/>
                  </TouchableOpacity>
                  
                    <Image style={styles2.animalImg} source={{uri: image}}/> 
                    <Text style={styles2.animalName}>{name}</Text>
                    <Text style={styles2.animalBreed}>{breeds.primary}</Text>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', 
                    justifyContent: 'space-between'}}>
                      <View>{status != null ? (<Text style={{fontSize: 19, fontWeight: 'bold', color: '#ED3E96'}}>Status: {status}</Text>) : (<></>)}</View>
                      <View>{gender != null ? (<Text style={{fontSize: 19, fontWeight: 'bold', color: '#ED3E96'}}>Gender: {gender}</Text>) : (<></>)}</View>
                      <View>{age != null ? (<Text style={{fontSize: 19, fontWeight: 'bold', color: '#ED3E96'}}>Age: {age}</Text>) : (<></>)}</View>
                      <View>{size != null ? (<Text style={{fontSize: 19, fontWeight: 'bold', color: '#ED3E96'}}>Size: {size}</Text>) : (<></>)}</View>
                    </View>
                    <View style={{marginVertical: 5,}}>{description != null ? (<Text style={{fontSize: 16, color: '#EE5AA4'}}>{description}</Text>) : (<></>)}</View>
                    
                    <View style={{marginTop: 5}}>
                      <Text style={{fontWeight: '600', fontSize: 17, color: '#ED3E96'}}>Health Info</Text>
                    </View>
                    <View>{attributes.special_needs != false 
                        ? (<Text style={{fontSize: 16, color: '#EE5AA4'}}>Special Needs Pet!</Text>) 
                        : (<></>)}
                    </View>
                    <View>{attributes.spayed_neutered != false 
                        ? (<Text style={{fontSize: 16, color: '#EE5AA4'}}>Spayed/Neutered: Yes</Text>) 
                        : (<Text style={{fontSize: 16, color: '#EE5AA4'}}>Spayed/Neutered: No</Text>)}
                    </View>
                    <View>{attributes.declawed != false && attributes.declawed != null
                        ? (<Text style={{fontSize: 16, color: '#EE5AA4'}}>Declawed: Yes</Text>) 
                        : (<></>)}
                    </View>
                    <View>{attributes.shots_current != false 
                        ? (<Text style={{fontSize: 16, color: '#EE5AA4'}}>Shots are Current</Text>) 
                        : (<Text style={{fontSize: 16, color: '#EE5AA4'}}>Shots are NOT Current</Text>)}
                    </View>
                   
                    <View>{attributes.house_trained != false 
                        ? (<Text style={{fontSize: 16, color: '#EE5AA4'}}>House Trained: Yes</Text>) 
                        : (<Text style={{fontSize: 16, color: '#EE5AA4'}}>House Trained: No</Text>)}
                    </View>

                    <View style={{marginTop: 5}}>
                      <Text style={{fontWeight: '600', fontSize: 17, color: '#ED3E96'}}>Shelter Info</Text>
                    </View>
                    <View>{contact.phone != null ? (<Text style={{fontSize: 16, color: '#EE5AA4'}}>Phone: {contact.phone}</Text>) : (<></>)}</View>
                    <View>{contact.email != null ? (<Text style={{fontSize: 16, color: '#EE5AA4'}}>Email: {contact.email}</Text>) : (<></>)}</View>
                    
                    <TouchableOpacity style={{position: 'absolute', right: 10, top: 1}} onPress={storeLike}>
                      {
                        like == true
                        ? (<MaterialCommunityIcons name={"heart"} color={'#D84E82'} size={36}/>)
                        : (<MaterialCommunityIcons name={"heart-outline"} color={'#D84E82'} size={36}/>)
                      }
                    </TouchableOpacity>
                </ScrollView>
              
                
                  
              </View>
                
                
                <TouchableOpacity
                style={{
                  height: 50,
                  width: 170,
                  position: 'absolute',
                  bottom: 35,
                  left: 110,
                  justifyContent: 'center',
                  borderRadius: 100,
                  marginTop: -18,
                  alignItems: 'center',
                  backgroundColor: '#E0127A'
                }}
                onPress={() => Linking.openURL(url.toString())}
                >
                <Text style={{color: 'white', fontSize: 25}}>Adopt!</Text>
              </TouchableOpacity>
              
            
        </Modal>
      );
    }

    
    

    return (
      <TouchableOpacity style={styles.tile} onPress={() => handleVisibility()}>
        <TouchableOpacity style={{position: 'absolute', top: -9, left: -9}} onPress={storeLike}>
          { like == true
          // position: 'absolute', bottom: 45, right: 9,
          // position: 'absolute', top: -8, left: -5
            ? (<MaterialCommunityIcons name={"heart"} color={'#D84E82'} size={26}/>)
            : (<MaterialCommunityIcons name={"heart-outline"} color={'#D84E82'} size={26}/>)
          }
          </TouchableOpacity>
        <Image style={styles.animalImg} source={{uri: image}} />
        { name.length > 14
            ? (<Text style={styles.animalName} numberOfLines={1}>{name.substring(0, 14)}...</Text>)
            : (<Text style={styles.animalName}>{name}</Text>)
        }
        <Text style={{marginLeft: 5, color: '#ED308F'}}>{breeds.primary}</Text>
      </TouchableOpacity>
    );
  };

  const Tile2 = (props) => {
    const {
      id, name, breeds, primary_photo_cropped,
      type, age, gender,
      size, status, contact,
      attributes, species, description
    } = props.i;
    var animalcard = [];
    animalcard = props.i;
    var image;
    if (primary_photo_cropped === null) {
      if (type === 'Dog') {
        image =
          'https://i.pinimg.com/564x/43/7a/9d/437a9d58adfe0b277efc3d6906d6a55c.jpg';
      } else if (type === 'Cat') {
        image =
          'https://i.pinimg.com/564x/ad/f8/de/adf8dea81bb563653fca398ce4d53040.jpg';
      } else if (type == 'Bird') {
        image =
          'https://i.pinimg.com/564x/66/4c/45/664c45cf13a13b3a3c57fe6f2e3149cb.jpg';
      } else if (type === 'Barnyard') {
        image =
          'https://i.pinimg.com/564x/ae/bd/81/aebd81411b57b56353edbf2f50616f52.jpg';
      } else {
        image =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
      }
    } else {
      image = primary_photo_cropped.small;
    }


    const [superCardVisible, setSuperCardVisible] = useState(false);
    function handleVisibilitySuper() {
      setSuperCardVisible(!superCardVisible);
    }
    const [superLike, setSuperLike] = useState(true);
    const storeSuperLike = () => {
      const user = firebase.auth().currentUser;
      const userID = user.uid;
      setSuperLike(!superLike);
      let Id = (id).toString();
      if (superLike) {
        firestore().collection('users').doc(userID).collection('superLiked').doc(Id).delete()
      } else if (!superLike) {
        setSuperLikeOptionVisible(true);
        // <likeOption/>
        if (superLike) {
          setSuperLikeOptionVisible(false);
          setSuperLike(true);
        } else {
          firestore().collection('users').doc(userID).collection('superLiked').doc(Id).set({animalcard})
        }
      }
      
    }
    const [superLikeOptionVisible, setSuperLikeOptionVisible] = useState(false);
    if (superLikeOptionVisible) {
      return (
        <Modal transparent={true} visible={superLikeOptionVisible} style={styles.likeOption}>
          <View style={styles.likeOptionBackground}>
            <View style={styles.likeOption}>
              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Are you sure you want to dislike?</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={[setSuperLikeOptionVisible(!superLikeOptionVisible), setSuperLike(false)]}>
                  <View style={[styles.buttons, {backgroundColor: '#FF478E'}]}>
                    <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>Yes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={[setSuperLikeOptionVisible(!superLikeOptionVisible), setSuperLike(true)]}>
                  <View style={[styles.buttons, {backgroundColor: '#85FF54'}]}>
                    <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>No</Text>
                  </View>
                </TouchableOpacity>
               
              </View>
            </View>
          </View>
        </Modal>
      )
    }
    if (superCardVisible) {
      return (
        <Modal visible={true} style={{flex: 1, backgroundColor: '#E65B90'}}>
          <View style={[styles2.tile, {backgroundColor: '#F76BAD'}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity style={{marginBottom: 3,}} onPress={() => handleVisibilitySuper()}>
                {/* <Image source={backArrowImage} style={styles2.back} /> */}
                <MaterialCommunityIcons name={"arrow-left-circle"} size={35} color={'white'}/>
              </TouchableOpacity>
              
                <Image style={styles2.animalImg} source={{uri: image}}/> 
                <Text style={[styles2.animalName, {color: 'white'}]}>{name}</Text>
                <Text style={[styles2.animalBreed, {color: '#FFE8F1'}]}>{breeds.primary}</Text>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', 
                justifyContent: 'space-between'}}>
                  <View>{status != null ? (<Text style={{fontSize: 19, fontWeight: 'bold', color: 'white'}}>Status: {status}</Text>) : (<></>)}</View>
                  <View>{gender != null ? (<Text style={{fontSize: 19, fontWeight: 'bold', color: 'white'}}>Gender: {gender}</Text>) : (<></>)}</View>
                  <View>{age != null ? (<Text style={{fontSize: 19, fontWeight: 'bold', color: 'white'}}>Age: {age}</Text>) : (<></>)}</View>
                  <View>{size != null ? (<Text style={{fontSize: 19, fontWeight: 'bold', color: 'white'}}>Size: {size}</Text>) : (<></>)}</View>
                </View>
                <View style={{marginVertical: 5,}}>{description != null ? (<Text style={{fontSize: 16, color: '#FFE8F1'}}>{description}</Text>) : (<></>)}</View>
                
                <View style={{marginTop: 5}}>
                  <Text style={{fontWeight: '600', fontSize: 17, color: 'white'}}>Health Info</Text>
                </View>
                <View>{attributes.special_needs != false 
                    ? (<Text style={{fontSize: 16, color: '#FFE8F1'}}>Special Needs Pet!</Text>) 
                    : (<></>)}
                </View>
                <View>{attributes.spayed_neutered != false 
                    ? (<Text style={{fontSize: 16, color: '#FFE8F1'}}>Spayed/Neutered: Yes</Text>) 
                    : (<Text style={{fontSize: 16, color: '#FFE8F1'}}>Spayed/Neutered: No</Text>)}
                </View>
                <View>{attributes.declawed != false && attributes.declawed != null
                    ? (<Text style={{fontSize: 16, color: '#FFE8F1'}}>Declawed: Yes</Text>) 
                    : (<></>)}
                </View>
                <View>{attributes.shots_current != false 
                    ? (<Text style={{fontSize: 16, color: '#FFE8F1'}}>Shots are Current</Text>) 
                    : (<Text style={{fontSize: 16, color: '#FFE8F1'}}>Shots are NOT Current</Text>)}
                </View>
                
                <View>{attributes.house_trained != false 
                    ? (<Text style={{fontSize: 16, color: '#FFE8F1'}}>House Trained: Yes</Text>) 
                    : (<Text style={{fontSize: 16, color: '#FFE8F1'}}>House Trained: No</Text>)}
                </View>

                <View style={{marginTop: 5}}>
                  <Text style={{fontWeight: '600', fontSize: 17, color: 'white'}}>Shelter Info</Text>
                </View>
                <View>{contact.phone != null ? (<Text style={{fontSize: 16, color: '#FFE8F1'}}>Phone: {contact.phone}</Text>) : (<></>)}</View>
                <View>{contact.email != null ? (<Text style={{fontSize: 16, color: '#FFE8F1'}}>Email: {contact.email}</Text>) : (<></>)}</View>
                
                <TouchableOpacity style={{position: 'absolute', right: 10, top: 2}} onPress={storeSuperLike}>
                    {
                      superLike == true
                      ? (<MaterialCommunityIcons name={"star"} color={'#F8C55F'} size={37}/>)
                      : (<MaterialCommunityIcons name={"star-outline"} color={'#F8C55F'} size={37}/>)
                    }
                  </TouchableOpacity>
              </ScrollView>
              
                
                  
              </View>
                
                
                <TouchableOpacity
                style={{
                  height: 100,
                  width: 370,
                  marginLeft: 12,
                  marginRight: 20,
                  justifyContent: 'center',
                  borderRadius: 100,
                  marginTop: -18,
                }}>
                <Button
                  title="Adopt"
                  onPress={() => Linking.openURL(url.toString())}
                  color="#6867ac"
                />
              </TouchableOpacity>
            
        </Modal>
      );
    }

    return (
      <TouchableOpacity style={[styles.tile, {backgroundColor: '#E65B90'}]} onPress={() => handleVisibilitySuper()}>
        <TouchableOpacity style={{position: 'absolute', top: -15, left: -12}} onPress={storeSuperLike}>
          { superLike == true
          // position: 'absolute', bottom: 45, right: 9,
          // position: 'absolute', top: -8, left: -5
            ? (<MaterialCommunityIcons name={"star"} color={'#F8C55F'} size={33}/>)
            : (<MaterialCommunityIcons name={"star-outline"} color={'#F8C55F'} size={33}/>)
          }
          </TouchableOpacity>
        <Image style={styles.animalImg} source={{uri: image}} />
        { name.length > 14
            ? (<Text style={[styles.animalName, {color: 'white'}]} numberOfLines={1}>{name.substring(0, 14)}...</Text>)
            : (<Text style={[styles.animalName, {color: 'white'}]}>{name}</Text>)
        }
        
        <Text style={{marginLeft: 5, color: 'white'}}>{breeds.primary}</Text>
      </TouchableOpacity>
    );
  }

  // if (!isLoading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF7FA'}}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Favorites</Text>
          </View>
          {/* <Button title={'output'} onPress={() => output()}/> */}
          <View style={styles.container}>
          { superLikedData == []
            ? (<Text>Like Pets to Show Up Here!</Text>)
            : (superLikedData?.map(i => (
              <Tile2 i={i.animalcard} key={i.animalcard}/> 
                ))
              )
            
            }
            { likedData == []
            ? (<Text>Like Pets to Show Up Here!</Text>)
            : (likedData?.map(i => (
              <Tile i={i.animalcard} key={i.animalcard}/> 
                ))
              )
            
            }
            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  // } else {
  //   return (

  //     <ScrollView style={{flex: 1, backgroundColor: '#fbfbfb'}}>
  //       <Text style={styles.title}>Favorites</Text>
  //       <Text style={{marginLeft: 80, marginTop: 10, fontSize: 20}}>
  //         Searching for...
  //       </Text>
  //     </ScrollView>
  //   );
  // }
};



export default LikedScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 10,
    fontWeight: '900',
    color: '#DE5B71',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tile: {
    backgroundColor: '#F6CEDD',
    width: '40%',
    height: 220,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 10,
    borderRadius: 20,
    elevation: 5,
  },
  animalName: {
    color: '#ED308F',
    fontSize: 18,
    marginTop: 2,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  animalImg: {
    width: '96%',
    height: 135,
    borderRadius: 20,
    marginLeft: 3,
    marginTop: 5,
  },
  expandTile: {
    fontSize: 10,
    marginTop: 1,
    fontWeight: 'bold',
    marginLeft: 87,
    color: '#CE7BB0',
  },
  likeOptionBackground: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  likeOption: {
    backgroundColor: 'white',
    marginVertical: 200,
    marginHorizontal: 50,
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    borderRadius: 20,
    marginHorizontal: 9,
    marginTop: 5,
    marginBottom: 2,
    paddingHorizontal: 10,
    paddingVertical: 3,
  }
});

const styles2 = StyleSheet.create({
  tile: {
    backgroundColor: '#F6CEDD',
    height: 600,
    padding: 15,
    margin: 10,
    marginBottom: 1,
    borderRadius: 20,
    elevation: 3,
  },
  animalName: {
    color: '#D52D6C',
    fontSize: 30,
    fontWeight: 'bold',
  },
  space: {
    width: 20, // or whatever size you need
    height: 10,
  },
  animalImg: {
    width: '100%',
    height: 330,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 3,
    marginLeft: 1,
  },
  animalBreed: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#EB57A1',
  },
  bio: {
    fontSize: 15,
    color: '#6867ac',
  },
  tags: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6867ac',
  },
  back: {
    width: 70,
    height: 50,
    marginLeft: -15,
    marginBottom: -5,
  },
});

{/*
tile: F6CEDD 
name: D52D6C
text: ED3E96
subtext: EE5AA4
heart: D84E82

*/}
