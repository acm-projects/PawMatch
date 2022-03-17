import React from "react";
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { baseGestureHandlerWithMonitorProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";

const WelcomeScreen = ({navigation}) => {

    function skipPreferences(user) {
        navigation.replace("PawMatch")
    }

    function submitPreferences(user) {
        navigation.replace("PawMatch")
    }

    return (
        <ScrollView>
            <Text style={styles.title}>Welcome</Text>

            <View>
                <Text style={{textAlign: 'center'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl enim, convallis a imperdiet vitae, dapibus id massa. Fusce mattis, augue id posuere laoreet, nulla libero interdum tellus, ut posuere ligula tellus ac nibh. Vivamus ultricies ac magna ac dapibus. Integer placerat diam in tellus feugiat congue. Quisque vitae ex vel libero fringilla volutpat. Duis pellentesque massa ut sagittis vestibulum. Vestibulum ante risus, dictum vitae laoreet vel, eleifend id nulla. In id placerat felis. Ut quis metus bibendum dolor mattis vestibulum id quis quam. Nullam eget nulla non ipsum semper molestie in id ligula. Suspendisse pretium egestas risus quis finibus.
                    Donec aliquet est ut justo pellentesque, sit amet laoreet velit consectetur. Mauris in sagittis elit. Etiam sapien magna, accumsan vitae vehicula ut, finibus id nibh. Pellentesque lacus mi, facilisis a iaculis et, egestas at nulla. Cras sagittis sem libero, quis condimentum nulla ornare ut. Donec sagittis orci non elit interdum, eu elementum leo facilisis. Duis lacinia volutpat feugiat. In vehicula tellus lectus, eu viverra ligula malesuada at. Nunc porta varius dictum. Donec at nulla porta, bibendum enim vitae, efficitur neque. Donec feugiat nunc finibus vestibulum aliquet. Curabitur volutpat odio augue, rhoncus maximus neque laoreet at. Integer consequat vitae elit a laoreet. Proin sed blandit elit. Sed mollis dignissim sapien.
                    Quisque quam arcu, eleifend nec elit eu, vulputate faucibus massa. Etiam ut elit mauris. Nam eros metus, lobortis sit amet sapien id, efficitur laoreet eros. Maecenas dui nisi, lobortis id dapibus malesuada, eleifend ultrices ex. Sed tempor in mi a efficitur. Morbi facilisis, nisi vel elementum lacinia, neque risus bibendum mi, nec auctor diam erat et libero. Sed quis nibh lobortis quam elementum pharetra iaculis ac turpis. Nunc mollis pellentesque eros, vitae vehicula dolor tempor sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Quisque quam arcu, eleifend nec elit eu, vulputate faucibus massa. Etiam ut elit mauris. Nam eros metus, lobortis sit amet sapien id, efficitur laoreet eros. Maecenas dui nisi, lobortis id dapibus malesuada, eleifend ultrices ex. Sed tempor in mi a efficitur. Morbi facilisis, nisi vel elementum lacinia, neque risus bibendum mi, nec auctor diam erat et libero. Sed quis nibh lobortis quam elementum pharetra iaculis ac turpis. Nunc mollis pellentesque eros, vitae vehicula dolor tempor sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </Text>
            </View>

            <View style={styles.buttonAlignment}>
                <View style={styles.button}>
                    <Button title="Skip" onPress={skipPreferences} color="#919A8C"/>
                </View>
                <View style={styles.button}>
                    <Button title="Submit" onPress={submitPreferences} color="#6867ac"/>
                </View>
            </View>
        </ScrollView>
    );

}

export default WelcomeScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        margin: 20,
        textAlign: 'center',
        color: '#fb5555',
        fontWeight: 'bold',
    },
    buttonAlignment: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },
    
})