/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
Touchable类组件：
RN中很多组件没有onPress方法，如果要实现点击效果，可以用Touchable类组件包裹子组件来完成。
TouchableHighlight：有高亮效果，可以改变点击的背景颜色
TouchableOpacity：有透明度变化的效果。
TouchableWithoutFeedback：没有效果，点击会触发onPress方法。
 
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PixelRatio,
  Text,
  View
} from 'react-native';


class RNTest extends Component {
  show(txt) {
    alert(txt);
  }
  render() {
    return (
      <View style={[styles.flex,styles.topStatus]}>
            <TouchableHighlight onPress={this.show.bind(this,"欢迎学习react native技术")}
              onderlayColor="red" >

              <Text style={styles.item} >react-native技术-TouchableHighlight</Text>
            </TouchableHighlight>

            <TouchableOpacity onPress={this.show.bind(this,"作者郑佳丽")} >

              <Text style={styles.item}>作者郑佳丽-TouchableOpacity</Text>
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={this.show.bind(this,"欢迎学习react native技术")}>

              <Text style={styles.item}>啦啦-TouchableWithoutFeedback</Text>
            </TouchableWithoutFeedback>
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

  item:{
    fontSize:16,
    paddingTop:5,
    paddingBottom:10,
  },
 
});

AppRegistry.registerComponent('RNTest', () => RNTest);
