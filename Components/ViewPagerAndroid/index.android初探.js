/**
 * Sample React Native App
 * https://github.com/facebook/react-native

ViewPagerAndroid组件：
一个允许在子视图之间左右翻页的容器。每个ViewPagerAndroid的子容器会被视作一个单独的页，
并且会被拉伸填满ViewPagerAndroid.
注：所有子视图必须是纯View，不能是自定义的符复合容器。

属性：
1.initialPage 初始化选中页的下标。
2.onPageScroll 当页面切换时执行。
  回调参数中的event.nativeEvent对象会包含如下数据：
  position offset 一个在[0,1)之间的范围，代表当前页面切换的状态。

3.onPageScrollStateChanged  idle  dragging   settling
4.onPageSelected 这个回调会在页面切换完成后调用。
  回调参数中的event.nativeEvent对象包含如下字段，position
5.scrollEnabled boolean



 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    ViewPagerAndroid
    } from 'react-native';



class RNTest extends Component {
  render() {
  	
    return (
   
     	<ViewPagerAndroid
      initialPage={0}
      style={styles.flex}>

        <View style={styles.center} ><Text style={[{fontSize:12},{color:'red'}]}>第一个页面</Text></View>

        <View style={styles.center}><Text style={[{fontSize:16}]}>第一个页面</Text></View>


        <View style={styles.center}><Text style={[{color:'blue'}]}>第一个页面</Text></View>


      </ViewPagerAndroid>


    );
  }
}



const styles = StyleSheet.create({

  flex:{
    flex:1,    
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
  }



});

AppRegistry.registerComponent('RNTest', () => RNTest);
