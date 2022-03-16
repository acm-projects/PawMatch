import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

{/* TODO
1) add functionality to interests 
2) connect firebase to user profile page
3) Remove Adoption Tiles later
*/}

const ProfileScreen = ({navigation}) => {

    function logoutUser(){          
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        navigation.replace("Login");
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff2f7'}}>
            <ScrollView>

                <View style={{width:400, height:110, flex:1, flexDirection:'row'}}>
                    {/*View Profile Pic*/}
                    <Image 
                        style={styles.userImg} 
                        source={{uri: 'https://media.istockphoto.com/photos/mature-beautiful-woman-with-red-hair-picture-id1221755378?k=20&m=1221755378&s=612x612&w=0&h=rZkb0wrSR4-Qfl-MIDbD8_2L_V2KYWOf0P_EqUveAAA='}}
                    /> 

                    {/*View Info About User*/}
                    <Text style={styles.userName}>Mary Smith</Text>
                </View>

                    {/*View Interest*/}
                    <View style={{width:400, height:50, flex:1, flexDirection:'row', marginTop: 10}}>
                        <Text style={styles.interestsAndAdoptionsTitles}>Your Interests</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.tile}>
                            <Text style={styles.text}>Hamsters            X</Text>
                        </View>

                        <View style={styles.tile}>
                            <Text style={styles.text}>Dogs                     X</Text>
                        </View>

                        <View style={styles.tile}>
                            <Text style={styles.text}>Cats                      X</Text>
                        </View>

                        <View style={styles.addTile}>
                            <Text style={styles.text}>+</Text>
                        </View>
                    </View>

                    {/*View Adoptions*/}
                    <Text style={styles.interestsAndAdoptionsTitles}>Your Adoptions</Text>

                    <View style={styles.container}>
                        <View style={styles.adoptionTile}>
                        <Image 
                            style={styles.adoptionImg} 
                            source={{uri: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80'}}
                            /> 
                            <Text style={styles.text}>Benji</Text>
                            <Text style={styles.adopText}>Adopted: Aug. 10 2021</Text>
                        </View>

                        <View style={styles.adoptionTile}>
                        <Image 
                            style={styles.adoptionImg} 
                            source={{uri: 'https://media.istockphoto.com/photos/bigeyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-picture-id1199279669?b=1&k=20&m=1199279669&s=170667a&w=0&h=munUsqGIlDAmKK0ouS12nHCuzDdoDfvNalw_hHvh6Ls='}}
                            /> 
                            <Text style={styles.text}>Luna</Text>
                            <Text style={styles.adopText}>Adopted: Oct. 28 2021</Text>
                        </View>

                         {/*Log Out Button*/}
                        <TouchableOpacity style={{ height: 100, width: 350, marginLeft: 20, marginRight: 20, justifyContent: 'center'}}>
                            <Button color="#6867ac" title="Log Out" onPress={logoutUser} />
                        </TouchableOpacity>
                    </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

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
        borderColor: "#6867AC",
    },
    userName: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: "#6867AC",
    },
    interestsAndAdoptionsTitles: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: "#6867AC",
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
        color: "#6867AC",
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
        borderColor: "#6867AC",
    },
    adopText: {
        fontSize: 12, 
        fontWeight: 'bold', 
        marginLeft: 10,
        color: "#CE7BB0",
    },
})