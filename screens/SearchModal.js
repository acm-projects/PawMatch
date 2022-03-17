import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity} from 'react-native';
import { Checkbox } from 'react-native-paper';

class SearchModal extends Component{
    state = {
        modal: true
    }

    handleModal = () => {
        this.setState({
            modal: !this.state.modal ? true : false
        })
    }
    
    render() {
        return (
            <View>
                <Button 
                style={styles.button}
                title="New Search" 
                onPress={this.handleModal} 
                />
                <Modal 
                    visible={this.state.modal}
                    transparent={true}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            {/*change text next to checkboxes*/}
                            <Text>Select Search</Text>
                            <CheckboxComponent /><Text>Dog</Text>
                            <CheckboxComponent /><Text>Cat</Text>
                            <CheckboxComponent /><Text>Bunny</Text>
                            <CheckboxComponent /><Text>Bunny</Text>
                            <CheckboxComponent /><Text>Young</Text>
                            <CheckboxComponent /><Text>Adult</Text>
                            <CheckboxComponent /><Text>Senior</Text>
                            <CheckboxComponent /><Text>Vaccinated</Text>
                            <Button title="Search" onPress={this.handleModal} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
    
}

export default SearchModal;

const CheckboxComponent = () => {
    const [checked, setChecked] = React.useState(false);
    return (
       <View style={styles.checkbox}>
          <Checkbox
             status={checked ? 'checked' : 'unchecked'}
             onPress={() => {
                setChecked(!checked);
             }}
             color={'purple'}
          />
       </View>
    );
 };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBackground: {
        backgroundColor: '#000000aa',
        flex: 1,
    },
    modalContainer: {
        backgroundColor: 'white',
        margin: 30,
        padding: 100,
        borderRadius: 20,
        flex: 1,
    },
    button: {
        backgroundColor: 'purple',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkbox: {
        justifyContent: 'space-around'
    },
    checkboxText: {
        marginHorizontal: 8,
    }
})