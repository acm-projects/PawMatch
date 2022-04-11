import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { searchAnimals } from '../api/searchAnimals.js';

var apicall;

export default function Interests() {
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
    
    const callAPI = () => {
        if (!(zipCode >= 501 && zipCode.length == 5)) {
            alert('You must enter a valid zipcode')
            console.log('Call Cancelled')
        }
        else {
            console.log(zipCode)
            for (let i = 0; i < checkedType.length; i++) {
                if (checkedType[i].isChecked == true) {
                    console.log(checkedType[i].key)
                }
            }
            for (let i = 0; i < checkedAge.length; i++) {
                if (checkedAge[i].isChecked == true) {
                    console.log(checkedAge[i].key)
                }
            }
            for (let i = 0; i < checkedGender.length; i++) {
                if (checkedGender[i].isChecked == true) {
                    console.log(checkedGender[i].key)
                }
            }
            for (let i = 0; i < checkedSize.length; i++) {
                if (checkedSize[i].isChecked == true) {
                    console.log(checkedSize[i].key)
                }
            }
        
            //apicall =searchAnimals(78747, "Dog", "Young", "Male", "Small");
            //searchAnimals(78747, checkedType, "Young", "Male", "Small");

        }
        
    };


    return (
        <SafeAreaView>
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
    button: {
        marginBottom: 60,
        marginTop: 20,
    },

})