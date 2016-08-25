/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

class RNDemo3 extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      imageUri:null,
    };
  }

  async pick_image() {
  //  alert('调用原生模块的方法');
    
    let _this = this;
    /*
    try {
      var uri = await NativeModules.ImagePickerModule.pickerImage();
 
      console.log('uri:'+uri);
      console.log('this:'+_this);
      if(uri != null) {
        _this.setState({
            imageUri:uri
          });
      }
    } catch (e) {
      console.error(e);
    }
    */
    var imagePickerModule = NativeModules.ImagePickerModule;
    imagePickerModule.pickerImage().then(set(uri))
    .catch((tag, errorMsg) => {
      console.log('error:'+errorMsg);
    });
  }

  set(uri) {
    this.setState({
      imageUri:uri,
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
       <Button onPress={this.pick_image} text='点击选择图片'/>

       <Image style={styles.img} 
          resizeMode="contain"
          source={{uri:'content://media/external/images/media/38376'}}
          />
       {/*判断是否显示图片,一个三元运算*/}
       {this.state.imageUri != null?
          <Image style={styles.img} 
          resizeMode="contain"
          source={{uri:'content://media/external/images/media/38376'}}
          />
          :null
        }
       
      </View>
    );
  }
}

class Button extends Component {
  render() {
    return (
      <TouchableOpacity
      style={styles.button}
      onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    padding:10,
    borderRadius:5,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:"#ccc",
  },
  buttonText:{
    fontSize: 16,
    textAlign: 'center',
  },
  img:{
    height:150,
    width:200,
    marginTop:10,
 },
});

AppRegistry.registerComponent('RNDemo3', () => RNDemo3);
