import React, {useState} from "react";
import { ScrollView, View, Text, TextInput, SafeAreaView, TouchableOpacity, FlatList, Button, StyleSheet } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const WelcomeScreen = ({navigation}) => {

    function submitPreferences() {
        if (!(zipCode >= 501 && zipCode.length == 5)) {
            alert('Please enter a valid zipcode to begin');
        }
        else {
            userChoices = [];
            for (let i = 0; i < checkedType.length; i++) {
                if (checkedType[i].isChecked == true) {
                    userChoices.push(checkedType[i].key);
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
            const user = firebase.auth().currentUser;
            const userID = user.uid;
            firestore().collection('users').doc(userID).update({userChoices, zipCode})
            navigation.replace("Info")
            }
        }
        
    const type = [
        {id: 0, key: 'Dog', isChecked: false},
        {id: 1, key: 'Cat', isChecked: false},
        {id: 2, key: 'Rabbit', isChecked: false},
        {id: 3, key: 'Other', isChecked: false} 
    ];

    const age = [
        {id: 0, key: 'Baby', isChecked: false},
        {id: 1, key: 'Young', isChecked: false},
        {id: 2, key: 'Adult', isChecked: false},
        {id: 3, key: 'Senior', isChecked: false}
    ];

    const gender = [
        {id: 0, key: 'Female', isChecked: false},
        {id: 1, key: 'Male', isChecked: false}
    ];
    
    const size = [
        {id: 0, key: 'Small', isChecked: false},
        {id: 1, key: 'Medium', isChecked: false},
        {id: 2, key: 'Large', isChecked: false}
    ];

    const[zipCode, setZipCode] = React.useState(null);
    const[checkedType, setCheckedType] = useState(type)
    const[checkedAge, setCheckedAge] = useState(age)
    const[checkedGender, setCheckedGender] = useState(gender)
    const[checkedSize, setCheckedSize] = useState(size)

    const handleChangeType = (id) => {
        var typeTemp = checkedType.map((searchType) => {
            if (id === searchType.id) {
                return {...searchType, isChecked: !searchType.isChecked}
            }
            return searchType;
        });
        setCheckedType(typeTemp);  
    };
    const handleChangeAge = (id) => {
        var ageTemp = checkedAge.map((searchAge) => {
            if (id === searchAge.id) {
                return {...searchAge, isChecked: !searchAge.isChecked}
            }
            return searchAge;
        });
        setCheckedAge(ageTemp); 
    };
    const handleChangeGender = (id) => {
        var genderTemp = checkedGender.map((searchGender) => {
            if (id === searchGender.id) {
                return {...searchGender, isChecked: !searchGender.isChecked}
            }
            return searchGender;
        });
        setCheckedGender(genderTemp);
    };
    const handleChangeSize = (id) => {
        var sizeTemp = checkedSize.map((searchSize) => {
            if (id === searchSize.id) {
                return {...searchSize, isChecked: !searchSize.isChecked}
            }
            return searchSize;
        });
        setCheckedSize(sizeTemp); 
    };
    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1,}}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.introText1}>Select what you're looking for so we can find you your new best friend!</Text>
            <Text style={styles.introText2}>These can always be changed in the Profile tab</Text>
            <View style={{marginLeft: 40}}>
            <View style={styles.ZipCodeContainer}>
                <Text style={styles.ZipCodeHeader}>Zip Code</Text>
                <View style={styles.ZipCodeInputBox}>
                    <TextInput 
                    onChangeText={zipCode => {setZipCode(zipCode)}}
                    style={styles.ZipCodeInputText}
                    maxLength={5}
                    keyboardType={"numeric"}
                    
                    />
                </View>
            </View>
            
            <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxHeader}>Type</Text>
                <FlatList numColumns={2}
                    data={checkedType}
                    renderItem = {({ item }) => ( 
                        <>
                        <View 
                        style={styles.checkboxFormat}>
                            <TouchableOpacity value={item.isChecked} onPress={() => handleChangeType(item.id)}>
                                { item.isChecked == true
                                ? (<View style={styles.CheckedBox} />)
                                : (<View style={styles.unCheckedBox} />)
                                }
                            </TouchableOpacity>
                            <Text style={styles.checkboxText}>{item.key}</Text>                 
                        </View>
                        </>
                    )}
                    contentContainerStyle={{margin: 20}}
                />
                
            </View>
            
            <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxHeader}>Age</Text>
                <FlatList numColumns={2}
                    data={checkedAge}
                    renderItem = {({ item }) => ( 
                        <>
                        <View 
                        style={styles.checkboxFormat}>
                             <TouchableOpacity value={item.isChecked} onPress={() => handleChangeAge(item.id)}>
                                { item.isChecked == true
                                ? (<View style={styles.CheckedBox} />)
                                : (<View style={styles.unCheckedBox} />)
                                }
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
                <FlatList numColumns={2}
                    data={checkedGender}
                    renderItem = {({ item }) => ( 
                        <>
                        <View 
                        style={styles.checkboxFormat}>
                             <TouchableOpacity value={item.isChecked} onPress={() => handleChangeGender(item.id)}>
                                { item.isChecked == true
                                ? (<View style={styles.CheckedBox} />)
                                : (<View style={styles.unCheckedBox} />)
                                }
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
                <FlatList numColumns={2}
                    data={checkedSize}
                    renderItem = {({ item }) => ( 
                        <>
                        <View 
                        style={styles.checkboxFormat}>
                             <TouchableOpacity value={item.isChecked} onPress={() => handleChangeSize(item.id)}>
                                { item.isChecked == true
                                ? (<View style={styles.CheckedBox} />)
                                : (<View style={styles.unCheckedBox} />)
                                }
                            </TouchableOpacity>
                            <Text style={styles.checkboxText}>{item.key}</Text>                 
                        </View>
                        </>
                    )}
                    contentContainerStyle={{margin: 20}}
                />
                
            </View>
            </View>

            


            <View style={styles.buttonAlignment}>
                <TouchableOpacity style={styles.buttonContainer} onPress={submitPreferences}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    );

}

export default WelcomeScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginTop: 20,
        textAlign: 'center',
        color: '#fb5555',
        fontWeight: 'bold',
    },
    buttonAlignment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
      checkboxText: {
        fontSize: 20,
        color: '#8E8E8E'
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
        flex: 1
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
        alignSelf: 'center'
        
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
    introText1: {
        textAlign: 'center',
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    introText2: {
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    
})