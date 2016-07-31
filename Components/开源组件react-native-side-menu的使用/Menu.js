'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
} from 'react-native';

var Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Menu extends Component {
	//定义一个必须要用的属性
	static propTypes = {
    	onItemSelected: React.PropTypes.func.isRequired,
  	};

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('./img/my_icon.png') }/>
          <Text style={styles.name}>Your name</Text>
        </View>

        <Text
          onPress={() => this.props.onItemSelected('About')}
          style={styles.item}>
          About
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Contacts')}
          style={styles.item}>
          Contacts
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#9DD6EB',
    padding: 20,
 	},
	
	avatarContainer:{
		flexDirection:'row'	
	},
	avatar:{
		width:50,
		height:50,
		borderRadius:25,
	},
	name:{
		fontSize:20,
	},
	item:{
		fontSize:16,
	}
});
