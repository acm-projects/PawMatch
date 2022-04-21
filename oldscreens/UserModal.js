import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  Flatlist,
  Button,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import UserInterest from './UserInterest';
import xImage from './x.png';

export default class UserModal extends Component {
  state = {
    modal: false,
  };

  constructor(props) {
    super(props);
    // this.state = {
    //     // search: [
    //     //    ["Dog", "Cat", "Rabbit", "Other"],
    //     //    ["Baby", "Young", "Adult", "Senior"],
    //     //    ["Female", "Male", "NULL", "NULL"],
    //     //    ["Small", "Medium", "Large", "NULL"]
    //     // ],
    //     // Data: [][4],

    //     typeAnimal: ["Dog", "Cat", "Rabbit", "Other"],
    //     // age: ["Baby", "Young", "Adult", "Senior"],
    //     // gender: ["Female", "Male"],
    //     // size: ["Small", "Medium", "Large"],

    //     Data: [],
    //     // Data2: [],
    //     // Data3: [],
    //     // Data4: [],

    // };
  }

  handleModal = () => {
    this.setState({
      modal: !this.state.modal ? true : false,
    });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              this.handleModal();
            }}>
            <View style={styles.addTile}>
              <Text style={styles.addTileText}>edit</Text>
            </View>
          </TouchableOpacity>
          <Modal transparent={true} visible={this.state.modal}>
            <SafeAreaView style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleModal();
                  }}>
                  <Image source={xImage} style={styles.xout} />
                </TouchableOpacity>
                <Text style={styles.searchTitle}>Choose Interests</Text>
                {/* <Interests /> */}

                <UserInterest />
              </View>
            </SafeAreaView>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
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
    fontSize: 30,
    color: '#FB5555',
    alignSelf: 'center',
  },
  xout: {
    width: 15,
    height: 15,
    marginLeft: 270,
    marginBottom: -5,
  },
  addTile: {
    backgroundColor: '#FFBCD1',
    width: 60,
    height: 30,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTileText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  // unCheckedBox: {
  //     borderColor: '#969696',
  //     borderWidth: 2,
  //     borderRadius: 7,
  //     height: 20,
  //     width: 20,
  //     marginRight: 6,
  //     marginVertical: 3,
  // },
  // CheckedBox: {
  //     borderColor: '#969696',
  //     backgroundColor: '#C4C4C4',
  //     borderWidth: 2,
  //     borderRadius: 7,
  //     height: 20,
  //     width: 20,
  //     marginRight: 6,
  //     marginVertical: 3,
  // },
  // checkboxText: {
  //     fontSize: 20,
  //     color: '#8E8E8E'
  // },
});
