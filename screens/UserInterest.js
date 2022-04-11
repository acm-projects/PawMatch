import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

export var userChoices = [
  {key: ''}
];

export default function UserInterest() {

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

  const [zipCode, setZipCode] = React.useState(null);
  const [checkedType, setCheckedType] = useState(type);
  const [checkedDogBreed, setCheckedDogBreed] = useState(dogBreed);
  const [checkedCatBreed, setCheckedCatBreed] = useState(catBreed);
  const [checkedAge, setCheckedAge] = useState(age);
  const [checkedGender, setCheckedGender] = useState(gender);
  const [checkedSize, setCheckedSize] = useState(size);
  const [checkedCoat, setCheckedCoat] = useState(coat);
  const [checkedOtherReqs, setCheckedOtherReqs] = useState(otherReqs);

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

  const callAPI = () => {
    if (!(zipCode >= 501 && zipCode.length == 5)) {
      alert('You must enter a valid zipcode');
      console.log('Call Cancelled');
    } else {
      console.log(zipCode);
      userChoices = [];
      for (let i = 0; i < checkedType.length; i++) {
        if (checkedType[i].isChecked == true) {
          userChoices.push({key: checkedType[i].key});
          console.log(checkedType[i].key);
        }
      }
      for (let i = 0; i < checkedDogBreed.length; i++) {
        if (checkedDogBreed[i].isChecked == true) {
          userChoices.push({key: checkedDogBreed[i].key});
          console.log(checkedDogBreed[i].key);
        }
      }
      for (let i = 0; i < checkedCatBreed.length; i++) {
        if (checkedCatBreed[i].isChecked == true) {
          userChoices.push({key: checkedCatBreed[i].key});
          console.log(checkedCatBreed[i].key);
        }
      }
      for (let i = 0; i < checkedAge.length; i++) {
        if (checkedAge[i].isChecked == true) {
          userChoices.push({key: checkedAge[i].key});
          console.log(checkedAge[i].key);
        }
      }
      for (let i = 0; i < checkedGender.length; i++) {
        if (checkedGender[i].isChecked == true) {
          userChoices.push({key: checkedGender[i].key});
          console.log(checkedGender[i].key);
        }
      }
      for (let i = 0; i < checkedSize.length; i++) {
        if (checkedSize[i].isChecked == true) {
          userChoices.push({key: checkedSize[i].key});
          console.log(checkedSize[i].key);
        }
      }
      for (let i = 0; i < checkedCoat.length; i++) {
        if (checkedCoat[i].isChecked == true) {
          userChoices.push({key: checkedCoat[i].key});
          console.log(checkedCoat[i].key);
        }
      }
      for (let i = 0; i < checkedOtherReqs.length; i++) {
        if (checkedOtherReqs[i].isChecked == true) {
          userChoices.push({key: checkedOtherReqs[i].key});
          console.log(checkedOtherReqs[i].key);
        }
      }

      console.log(JSON.stringify(userChoices));
      //console.log(userChoices[0]);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.ZipCodeContainer}>
        <Text style={styles.ZipCodeHeader}>Zip Code</Text>
        <View style={styles.ZipCodeInputBox}>
          <TextInput
            onChangeText={zipCode => {
              setZipCode(zipCode);
            }}
            style={styles.ZipCodeInputText}
            maxLength={5}
            keyboardType={'numeric'}
          />
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxHeader}>Type</Text>
        <FlatList
          numColumns={2}
          data={checkedType}
          renderItem={({item}) => (
            <>
              <View style={styles.checkboxFormat}>
                <TouchableOpacity
                  value={item.isChecked}
                  onPress={() => handleChangeType(item.id)}>
                  {item.isChecked == true ? (
                    <View style={styles.CheckedBox} />
                  ) : (
                    <View style={styles.unCheckedBox} />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>{item.key}</Text>
              </View>
            </>
          )}
          contentContainerStyle={{margin: 20}}
        />
      </View>

      {/*<View style={styles.checkboxContainer}>
          <Text style={styles.checkboxHeader}>Dog Breeds</Text>
          <FlatList
            numColumns={2}
            data={checkedDogBreed}
            renderItem={({item}) => (
              <>
                <View style={styles.checkboxFormat}>
                  <TouchableOpacity
                    value={item.isChecked}
                    onPress={() => handleChangeDogBreed(item.id)}>
                    {item.isChecked == true ? (
                      <View style={styles.CheckedBox} />
                    ) : (
                      <View style={styles.unCheckedBox} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>{item.key}</Text>
                </View>
              </>
            )}
            contentContainerStyle={{margin: 20}}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxHeader}>Cat Breeds</Text>
          <FlatList
            numColumns={2}
            data={checkedCatBreed}
            renderItem={({item}) => (
              <>
                <View style={styles.checkboxFormat}>
                  <TouchableOpacity
                    value={item.isChecked}
                    onPress={() => handleChangeCatBreed(item.id)}>
                    {item.isChecked == true ? (
                      <View style={styles.CheckedBox} />
                    ) : (
                      <View style={styles.unCheckedBox} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>{item.key}</Text>
                </View>
              </>
            )}
            contentContainerStyle={{margin: 20}}
          />
                    </View>*/}

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxHeader}>Age</Text>
        <FlatList
          numColumns={2}
          data={checkedAge}
          renderItem={({item}) => (
            <>
              <View style={styles.checkboxFormat}>
                <TouchableOpacity
                  value={item.isChecked}
                  onPress={() => handleChangeAge(item.id)}>
                  {item.isChecked == true ? (
                    <View style={styles.CheckedBox} />
                  ) : (
                    <View style={styles.unCheckedBox} />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>{item.key}</Text>
              </View>
            </>
          )}
          contentContainerStyle={{margin: 20}}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxHeader}>Gender</Text>
        <FlatList
          numColumns={2}
          data={checkedGender}
          renderItem={({item}) => (
            <>
              <View style={styles.checkboxFormat}>
                <TouchableOpacity
                  value={item.isChecked}
                  onPress={() => handleChangeGender(item.id)}>
                  {item.isChecked == true ? (
                    <View style={styles.CheckedBox} />
                  ) : (
                    <View style={styles.unCheckedBox} />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>{item.key}</Text>
              </View>
            </>
          )}
          contentContainerStyle={{margin: 20}}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxHeader}>Size</Text>
        <FlatList
          numColumns={2}
          data={checkedSize}
          renderItem={({item}) => (
            <>
              <View style={styles.checkboxFormat}>
                <TouchableOpacity
                  value={item.isChecked}
                  onPress={() => handleChangeSize(item.id)}>
                  {item.isChecked == true ? (
                    <View style={styles.CheckedBox} />
                  ) : (
                    <View style={styles.unCheckedBox} />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>{item.key}</Text>
              </View>
            </>
          )}
          contentContainerStyle={{margin: 20}}
        />
      </View>

      {/*<View style={styles.checkboxContainer}>
          <Text style={styles.checkboxHeader}>Coat</Text>
          <FlatList
            numColumns={2}
            data={checkedCoat}
            renderItem={({item}) => (
              <>
                <View style={styles.checkboxFormat}>
                  <TouchableOpacity
                    value={item.isChecked}
                    onPress={() => handleChangeCoat(item.id)}>
                    {item.isChecked == true ? (
                      <View style={styles.CheckedBox} />
                    ) : (
                      <View style={styles.unCheckedBox} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>{item.key}</Text>
                </View>
              </>
            )}
            contentContainerStyle={{margin: 20}}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxHeader}>Other Requirements</Text>
          <FlatList
            numColumns={2}
            data={checkedOtherReqs}
            renderItem={({item}) => (
              <>
                <View style={styles.checkboxFormat}>
                  <TouchableOpacity
                    value={item.isChecked}
                    onPress={() => handleChangeOtherReqs(item.id)}>
                    {item.isChecked == true ? (
                      <View style={styles.CheckedBox} />
                    ) : (
                      <View style={styles.unCheckedBox} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>{item.key}</Text>
                </View>
              </>
            )}
            contentContainerStyle={{margin: 20}}
          />
                    </View>*/}

      <TouchableOpacity onPress={callAPI}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
