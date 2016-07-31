/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ProgressBarAndroid,
    Text,
    View
    } from 'react-native';



class RNTest extends Component {
  render() {
    return (
      <View style={styles.flex}>
     	<Text>
     		PragressBarAndroid组件实例
     	</Text>
     	<ProgressBarAndroid styleAttr='Inverse' />
     	<ProgressBarAndroid color='green' styleAttr='Horizontal' progress={0.2}
     		indeterminate={false} style={{marginTop:10}} />
     	<ProgressBarAndroid color='green' styleAttr='Horizontal'
     		indeterminate={true} style={{marginTop:10}} />
     	<ProgressBarAndroid color='black' styleAttr='SmallInverse'
     		style={{marginTop:10}} />
      </View>


    );
  }
}



const styles = StyleSheet.create({

  flex:{
    flex:1,
    marginTop:10,
    backgroundColor:'#f4f4f4'

  },
 



});

AppRegistry.registerComponent('RNTest', () => RNTest);
