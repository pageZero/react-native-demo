/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 DrawerLayoutAndroid【进程用作导航页面】封装了Android平台的DrawerLayout控件，实现抽屉布局。
 属性：
 通过renderNavigationView渲染抽屉布局，
 通过drawerPosition指定位置，把导航视图拖拽进来，
 用drawerWidth指定拖拽进来的的宽度。
 onDrawerClose
 onDrawerOpen
 onDrawerSlide:当抽屉产生交互时调用该方法。
 onDrawerStateChanged:idle(空闲)，draffing(拖拽中)，setting(停靠)
 drawerLockMode:设置抽屉锁定模式，有3种模式：
        1.unlocked(默认值)：此抽屉可以响应打开或关闭的手势操作；
        2.locked-closed:此抽屉将保持关闭，不可用手势打开；
        3.locked-open:此抽屉将保持打开，不可用手势关闭

eg:
drawerWidth={150}
drawerPosition={DrawerLayoutAndroid.positions.left}
renderNavigationView={() => navigatorView} 
 注：DrawerLayoutAndroid应该作为最外层的视图。
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid
    } from 'react-native';



class RNTest extends Component {
  render() {
  	var navigatorView = (
  		<View style={styles.container} >
  			<Text style={styles.title} >导航功能标题栏</Text>
  			<Text style={styles.item} >1.首页</Text>
  			<Text style={styles.item} >2.地图</Text>
  		</View>);
    return (
   
     	<DrawerLayoutAndroid
     	drawerWidth={150}
     	drawerPosition={DrawerLayoutAndroid.positions.left}
     	renderNavigationView={() => navigatorView} >

     	<View style={{flex:1, alignItems:'center'}} >
     		<Text style={[styles.title]}>
     		主布局内容</Text>
     	</View>


     	</DrawerLayoutAndroid>
   


    );
  }
}



const styles = StyleSheet.create({

  container:{
    flex:1,
    
    backgroundColor:'#63b8ff'
  },
  title:{
  	margin:10,
  	color:'#fff',
  	fontSize:15,
  	textAlign:'center',
  },
  item:{
  	marginTop:10,
  	marginLeft:10,
  	color:'#fff',
  	fontSize:15,
  	textAlign:'left',
  }
 



});

AppRegistry.registerComponent('RNTest', () => RNTest);
