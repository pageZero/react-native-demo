/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

class RNTest extends Component {
  render() {
    return (
      <View style={[styles.flex,styles.topStatus]}>
            <Search></Search>
        </View>
    );
  }
}

class Search extends Component {
    render(){
        return (
            <View style={[styles.flex,styles.flexDirection]}>
                <View style={[styles.flex,styles.input]}>
                  <TextInput returnKeyType="search" />
                </View>

                <View style={styles.btn}>
                    <Text style={styles.search}>搜索</Text>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
  flex:{
    flex:1,

  },
  flexDirection:{
    flexDirection:'row',
  },
  topStatus:{
    marginTop:25,
  },
  input:{
    height:45,
    borderColor:'red',
    borderWidth:1,
    marginLeft:10,
    paddingLeft:10,
    borderRadius:5,
  },
  btn:{
    width:45,
    marginLeft:-5,
    marginRight:5,
    backgroundColor:'#23BEFF',
    height:45,
    justifyContent:'center',
    alignItems:'center',
  },
  search:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold',
  },
});

AppRegistry.registerComponent('RNTest', () => RNTest);
