/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    WebView,
    View,
    } from 'react-native';


import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class RNTest extends Component {
  render() {
  	
    return (
      <View style={styles.flex}>
        <WebView
          style={{height:height, width:width}}
          source={{uri:'http://www.baidu.com'}}
        ></WebView>

      </View>
     	


    );
  }
}



const styles = StyleSheet.create({

 flex:{
  flex:1,
 },


});

AppRegistry.registerComponent('RNTest', () => RNTest);
