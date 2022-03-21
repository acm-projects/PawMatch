import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

export default function Interests() {
    const[animaltype, setAnimalType] = useState([
        {id: 0, key: 'Dog', isChecked: false},
        {id: 1, key: 'Cat', isChecked: false},
        {id: 2, key: 'Rabbit', isChecked: false},
        {id: 3, key: 'Other', isChecked: false} 
    ]);

    const[age, setAge] = useState([
        {id: 0, key: 'Baby', isChecked: false},
        {id: 1, key: 'Young', isChecked: false},
        {id: 2, key: 'Adult', isChecked: false},
        {id: 3, key: 'Senior', isChecked: false}
    ]);

    const[gender, setGender] = useState([
        {id: 0, key: 'Female', isChecked: false},
        {id: 1, key: 'Male', isChecked: false}
    ]);
    
    const[size, setSize] = useState([
        {id: 0, key: 'Small', isChecked: false},
        {id: 1, key: 'Medium', isChecked: false},
        {id: 2, key: 'Large', isChecked: false}
    ]);

    const CheckboxTest = () => {
        alert('value changed')
    };

    
    const[checkedType, setCheckedType] = useState(false)

    // const handleChange = (id) => {
    //     let temp = checkedType.map((type) => {
    //       if (id === type.id) {
    //         return { ...type, isChecked: !type.isChecked };
    //       }
    //       return type;
    //     });
    //     setCheckedType(temp);
    //   };

    const[checkedAge, setCheckedAge] = useState(false)
    const[checkedGender, setCheckedGender] = useState(false)
    const[checkedSize, setCheckedSize] = useState(false)
    
    const [zipCode, setZipCode] = React.useState(null);
    const ZipCodeTest = () => {
        return (
            alert({zipCode})
        ); 
    };

    return (
        <SafeAreaView>
            <View style={styles.ZipCodeContainer}>
                <Text style={styles.ZipCodeHeader}>Zip Code</Text>
                <View style={styles.ZipCodeInputBox}>
                    <TextInput 
                    value={zipCode}
                    onChangeText={zipCode => setZipCode(zipCode)}
                    style={styles.ZipCodeInputText}
                    maxLength={5}
                    keyboardType={"numeric"}
                    
                    />
                </View>
            </View>
            
            <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxHeader}>Type</Text>
                <FlatList numColumns={2}
                    data={animaltype}
                    renderItem = {({ item }) => ( 
                        <>
                        <View 
                        style={styles.checkboxFormat}>
                            <TouchableOpacity value={checkedType} onPress={() => {setCheckedType(!checkedType)}} >
                                {checkedType == true
                                ? (<View style={styles.CheckedBox}/>)
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
                    data={age}
                    renderItem = {({ item }) => ( 
                        <>
                        <View 
                        style={styles.checkboxFormat}>
                            <TouchableOpacity value={checkedAge} onPress={() => {setCheckedAge(!checkedAge)}} >
                                {checkedAge == true
                                ? (<View style={styles.CheckedBox}/>)
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
                    data={gender}
                    renderItem = {({ item }) => ( 
                        <>
                        <View 
                        style={styles.checkboxFormat}>
                            <TouchableOpacity value={checkedGender} onPress={() => {setCheckedGender(!checkedGender)}} >
                                {checkedGender == true
                                ? (<View style={styles.CheckedBox}/>)
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
                    data={size}
                    renderItem = {({ item }) => ( 
                        <>
                        <View 
                        style={styles.checkboxFormat}>
                            <TouchableOpacity value={checkedSize} onPress={() => {setCheckedSize(!checkedSize)}}>
                                {checkedSize == true
                                ? (<View style={styles.CheckedBox}/>)
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
        width: 125,
        marginLeft: 10,
        marginVertical: 2,
    },
    ZipCodeInputText: {
        fontSize: 18,
        color: '#8E8E8E',
        marginVertical: -9,
        marginLeft: 3,
        
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
    }

})