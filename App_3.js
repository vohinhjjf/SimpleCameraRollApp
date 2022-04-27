var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ImagePickerIOS, Image, TouchableOpacity } from 'react-native';

export default class L10_CameraRollPicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: null
      };
      this.takePhoto = this.takePhoto.bind(this);
      this.chooseImage = this.chooseImage.bind(this);
    }
    takePhoto(){
        ImagePicker.launchCamera({noData: true}, this.SetImage);
    }
    chooseImage(){
        ImagePicker.launchImageLibrary({noData: true}, this.SetImage);
    }
    SetImage(response) {
      
        console.log('Response 1 = ', response.assets[0].uri);

        if (response.didCancel) {
            console.log('User cancelles image picker ');
        }else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }else if (response.customButton) {
            console.log('User tapped custom button ',response.customButton);
        }else {
            let source = {uri: response.assets[0].uri.replace('file://', ''), isStatic: true};

            if(Platform.OS === 'android'){
                source = {uri: response.assets[0].uri, isStatic: true};
            }
        }
    }
    

  render() {
    return (
      <View style={{flex: 1}}>
        <View sytle={{flex: 1}}>
          {this.state.image?<Image style={{flex: 1}} source={{uri: this.state.image}}></Image>:null}
        </View>
        <View style={styles.container}>
           <TouchableOpacity style={styles.button} onPress={this.takePhoto}>
             <Text style={styles.buttonText}>Camera</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={this.chooseImage}>
             <Text style={styles.buttonText}>Gallery</Text>
           </TouchableOpacity>
        </View>
      </View>
    );
  }
 }
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: 'gray',
      width: 150,
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10
    },
    buttonText: {
      color: 'white'
    }
  });