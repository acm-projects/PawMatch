//https://www.freepik.com/free-vector/cute-cat-with-love-heart-cartoon-vector-icon-illustration_16551084.htm
//https://www.freepik.com/free-vector/cute-parrot-bird-branch-cartoon-animal-wildlife-icon-concept-isolated-flat-cartoon-style_10920712.htm
//https://www.freepik.com/free-vector/cute-pug-dog-sitting-blue_13607154.htm
//https://www.freepik.com/free-vector/hen-with-chick-cartoon-illustration_10555268.htm
//https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png

import React, {useState, useEffect} from "react";
import {TouchableOpacity, View, ScrollView, FlatList, TextInput, Modal, Text, StyleSheet, Image } from 'react-native';
import xImage from '../../icons/x.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import apiJSON from '../../api/apicall.json';
//import {sZipCode, sAge, sType, sSize, sGender, sSearchState} from "./InterestPage";

var petfinder = require("@petfinder/petfinder-js");
//var client = new petfinder.Client({apiKey: "BW2quofQcKQRW8zaW5nxGCLiYxvlnYPZWfoWhD19EMp9oHbmjJ", secret: "zrA4VcQo24kvI21xAZjE6Ok8ZD6EZjEQ3JPBJ6hA"});
var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});
//var client = new petfinder.Client({apiKey: "P2a91yMjApUn8QYGc6OCutLXCYx4DRZuXHusdWQZxT3FDLkVqr", secret: "M4e9kQONsJUK8xDUah65CWNMwdmyRrK2llgXD8qQ"});

var sZipCode = [];
var sType = [];
var sAge = [];
var sGender = [];
var sSize = [];
var sSearchState = [];

const ShelterScreen = ({navigation}) => {
    const [apiData, setApiData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [refreshPage, setRefreshPage] = useState("");
    
    //const [isNewSearch, setSearchState] = useState(sSearchState);
/*
    console.log(sZipCode);
    console.log(sType);
    console.log(sAge);
    console.log(sGender);
    console.log(sSize);
*/
    function searchAnimalsMore(aZipcode, aType, aAge, aGender, aSize, lim) {
      if (isLoading){
        client.animal.search({
          location: aZipcode,
          type: aType,
          age: aAge,
          gender: aGender,
          size: aSize,
          limit: lim,
        }).then(resp => {
          setApiData(resp.data);
          setLoading(false);
          //setSearchState(false);
          return resp.data;
        });
      }
    }

        const Tile = (props) => {

            function expandTile() {
              navigation.replace("Tile2", {paramKey: props});
            };

            var text = 'expand>>';

            const{name, type, breeds, primary_photo_cropped, age, gender, size, status, contact, attributes, species} = props.animal;
            var image;
            if ( primary_photo_cropped === null){
              if (type === 'Dog'){
                  image = 'https://i.pinimg.com/564x/43/7a/9d/437a9d58adfe0b277efc3d6906d6a55c.jpg';
              } else if (type === 'Cat') {
                  image = 'https://i.pinimg.com/564x/ad/f8/de/adf8dea81bb563653fca398ce4d53040.jpg';
              } else if (type == 'Bird') {
                  image = 'https://i.pinimg.com/564x/66/4c/45/664c45cf13a13b3a3c57fe6f2e3149cb.jpg';
              } else if (type === 'Barnyard') {
                  image = 'https://i.pinimg.com/564x/ae/bd/81/aebd81411b57b56353edbf2f50616f52.jpg';
              } else {
                  image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1200px-Grey_close_x.svg.png';
              }
            } else {
              image = primary_photo_cropped.small;
            }
            return(
            <TouchableOpacity style={styles.tile} onPress={expandTile}>
                <Image style={styles.animalImg} source={{uri: image}}/> 
                <Text style={styles.animalName}>{name}</Text>
                <Text style={{marginLeft: 5, color: '#6867ac'}}>{breeds.primary}</Text>
                <Text style={styles.expandTile}>{text}</Text>
            </TouchableOpacity>
            );
          };

       searchAnimalsMore(sZipCode[0], sType[0], sAge[0], sGender[0], sSize[0], 6);
       /*
       if (isNewSearch.length != sSearchState.length){
        setSearch(sSearchState);
        console.log(isNewSearch);
       }
      console.log(sType);
      */
       //console.log("YOOOOOOOOOOOOOOOOOOOOOOOO");
       //console.log(apiData);

        //const callapi  = searchAnimalsMore(78745, "Dog", "Cat", "Rabbit", "Bird", "Young", "Baby", "Adult", "Senior", "Female", "Male", "Small", "Medium", "Large");
        //console.log(callapi);


















        const Search = () => {
          const type = [
            {id: 0, key: 'Dog', isChecked: false},
            {id: 1, key: 'Cat', isChecked: false},
            {id: 2, key: 'Bird', isChecked: false},
            {id: 3, key: 'Barnyard', isChecked: false},
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
        
          
          function callAPI(searchChoices) {
            sZipCode = [];
            sType = [];
            sAge = [];
            sGender = [];
            sSize = [];
            if (!(zipCode >= 501 && zipCode.length == 5)) {
              alert('You must enter a valid zipcode');
              console.log('Call Cancelled');
            } 
            else {
              searchChoices = [];
              //sZipCode.push(zipCode);
              for (let i = 0; i < checkedType.length; i++) {
                if (checkedType[i].isChecked == true) {
                  searchChoices.push(checkedType[i].key);
                  sType.push(checkedType[i].key);
                }
              }
              for (let i = 0; i < checkedDogBreed.length; i++) {
                if (checkedDogBreed[i].isChecked == true) {
                  searchChoices.push({key: checkedDogBreed[i].key});
                }
              }
              for (let i = 0; i < checkedCatBreed.length; i++) {
                if (checkedCatBreed[i].isChecked == true) {
                  searchChoices.push({key: checkedCatBreed[i].key});
                }
              }
              for (let i = 0; i < checkedAge.length; i++) {
                if (checkedAge[i].isChecked == true) {
                  searchChoices.push(checkedAge[i].key);
                  sAge.push(checkedAge[i].key);
                }
              }
              for (let i = 0; i < checkedGender.length; i++) {
                if (checkedGender[i].isChecked == true) {
                  searchChoices.push(checkedGender[i].key);
                  sGender.push(checkedGender[i].key);
                }
              }
              for (let i = 0; i < checkedSize.length; i++) {
                if (checkedSize[i].isChecked == true) {
                  searchChoices.push(checkedSize[i].key);
                  sSize.push(checkedSize[i].key);
                }
              }
              for (let i = 0; i < checkedCoat.length; i++) {
                if (checkedCoat[i].isChecked == true) {
                  searchChoices.push({key: checkedCoat[i].key});
                }
              }
              for (let i = 0; i < checkedOtherReqs.length; i++) {
                if (checkedOtherReqs[i].isChecked == true) {
                  searchChoices.push({key: checkedOtherReqs[i].key});
                }
              }
              editshowModal(!editShow);
              navigation.replace("Shelters");
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
            <View>
              <View>
                <TouchableOpacity style={styles1.searchButton} onPress={() => editshowModal(!editShow)}>
                <MaterialCommunityIcons name="magnify" color={'#FB5555'} size={40} />
                </TouchableOpacity>
              </View>
              <Modal visible={editShow} transparent={true}>
              <View style={styles1.modalBackground}>
                <View style={styles1.modalContainer}>
                  <Text style={styles1.title}>New Search</Text>
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
        }
















        if (!isLoading){
          return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <Search/>
                <View style={styles.containerTile}>
                  {apiData.animals.map(i => 
                    (<Tile key={i.id} animal = {i} />)
                  )} 
                </View>
            </ScrollView>
            
          );
        } else {
          return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fbfbfb'}}>
                <Text style={styles.title}>Pet Search</Text>
                <Search/>
                <Text style={{marginLeft: 80, marginTop: 10, fontSize: 20}}>Searching for...</Text>    
            </ScrollView>
            
          );
}

}


export default ShelterScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        marginTop: 20,
        marginBottom: 3,
        marginLeft: -70,
        fontWeight: '900',
        color: '#fb5555',
        alignSelf: 'center'
      },
  containerTile: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    tile: {
      backgroundColor: '#FFBCD1',
      width: '40%',
      height: 220,
      padding: 10,
      margin: 10,
      borderRadius: 20,
      elevation: 5,
    },
    animalName: {
      color: '#6867ac',
      fontSize: 18,
      marginTop: 2,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    animalImg: {
      width: '94%',
      height: 135,
      borderRadius: 20,
      marginLeft: 4.5,
      marginTop: 5,
    },
    expandTile: {
      fontSize: 10,
      marginTop: 1,
      fontWeight: 'bold',
      marginLeft: 87,
      color: '#CE7BB0',
    },
})

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
    alignSelf: 'center',
    fontSize: 37,
    color: '#FB5555',
    
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
  searchButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
    marginLeft: 275,
    marginRight: 45,
    marginTop: -48,
    marginBottom: 10,
    padding: 1,
    paddingHorizontal: 3,
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
    backgroundColor: '#FB5555',
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