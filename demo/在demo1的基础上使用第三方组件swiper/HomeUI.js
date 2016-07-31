/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow

 设置swiper的包裹组件的高度，只能使用属性height设置，不能使用样式style设置
 实现滚动视图：使用ScrollView
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';

Dimensions.get()
 
export default class HomeUI extends Component {

constructor(props) {
  super(props);

  this.state = {};
}

  goBack() {
    const {navigator} = this.props;
    if(navigator) {
      //当前页面出栈
      navigator.pop();
    }
  }
 

  render() {
    return(
      <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
      );
    

  }

  
}

const styles = StyleSheet.create({
    wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }

});


