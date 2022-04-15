import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import {Checkbox} from 'react-native-paper';

var arr = [];

export default class NewCh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Holder: '',
    };
  }

  AlertFunction = item => {
    Alert.alert(item);
  };

  AddItemsToArray = () => {
    //Adding Items To Array.
    arr.push(this.state.Holder.toString());

    // Showing the complete Array on Screen Using Alert.
    Alert.alert(arr.toString());
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          placeholder="Add More Interests"
          onChangeText={TextInputValue =>
            this.setState({Holder: TextInputValue})
          }
          style={{
            textAlign: 'center',
            marginBottom: 6,
            height: 45,
            color: '#6867ac',
          }}
        />

        <Button title="Submit" onPress={this.AddItemsToArray} />

        {arr.map((item, key) => (
          <Text
            key={key}
            style={styles.TextStyle}
            onPress={this.AlertFunction.bind(this, item)}>
            {' '}
            {item}{' '}
          </Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
  },

  TextStyle: {
    fontSize: 25,
    textAlign: 'center',
  },
});
