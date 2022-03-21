
import React, { Component } from "react";
import { View, Text, StyleSheet, Modal, Image, Button, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Interests from './InterestPage';
import xImage from './x.png';

export default class SearchModal extends Component {
    state = {
        modal: true
    }

    handleModal = () => {
        this.setState({
            modal: !this.state.modal ? true : false
        })
    }
    

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <TouchableOpacity onPress={() => {this.handleModal()}}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>New Search</Text>
                        </View>
                    </TouchableOpacity>
                <Modal transparent={true} visible={this.state.modal}>
                    <SafeAreaView style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={() => {this.handleModal()}}>
                                <Image source={xImage} style={styles.xout}/>
                            </TouchableOpacity>
                            <Text style={styles.searchTitle}>Animal Search</Text>
                            <Interests />
                            <TouchableOpacity onPress={() => {this.handleModal(); }}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Search</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
                </ScrollView>
            </SafeAreaView>
            
        )
    }


}

const styles = StyleSheet.create({
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
    searchTitle: {
        fontWeight: '900',
        margin: 8,
        marginTop: -0.5,
        marginBottom: 10,
        fontSize: 37,
        color: '#FB5555',
        alignSelf: 'center'
        
    },
    xout: {
        width: 15,
        height: 15,
        marginLeft: 270,
        marginBottom: -5,
    }
})