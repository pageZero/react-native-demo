/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  Text,
  View
} from 'react-native';

/*创建组件*/
class MyProject extends Component {
  render() {
    return (
      <View style={styles.flex}>
      <View style={styles.container}>
        
        <View style={[styles.item,styles.center]}>
          <Text style={styles.font}>酒店</Text>
        </View>

        <View style={[styles.item,styles.lineLeftRight]} >
          <View style={[styles.flex,styles.center,styles.lineCenter]}>
            <Text style={styles.font}>海外酒店</Text>
          </View>

          <View style={[styles.flex,styles.center]}>
            <Text style={styles.font}>特惠酒店</Text>
          </View>
        </View>

        <View style={styles.item}>
          <View style={[styles.flex,styles.center,styles.lineCenter]}>
            <Text style={styles.font}>团购</Text>
          </View>

          <View style={[styles.flex,styles.center]}>
            <Text style={styles.font}>客栈.公寓</Text>
          </View>

        </View>

      </View>
      </View>
    );
  }
}
/*添加样式表*/
const styles = StyleSheet.create({
  container: {
    marginTop:200,
    marginLeft:5,
    marginRight:5,
    height:84,
    borderRadius:5,/*圆角*/
    padding:2,
    flexDirection:'row',/*手机上默认主轴方向是垂直，现在改成水平*/
    backgroundColor: '#FF0067',
  },

  item:{
    flex:1,/*item都是flex为1，会将container平均分成3份*/
    height:80,
  },

  center:{
    justifyContent:'center',/*item在主轴方向上居中*/
    alignItems:'center',/*item在交叉轴方向上居中*/
  },

  flex:{
    flex:1,/*平分*/
  },

  font:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
  },

  lineLeftRight:{
    borderLeftWidth:1/PixelRatio.get(),/*获取高清设备像素比的函数，分之一表示取得是最小像素*/
    borderRightWidth:1/PixelRatio.get(),
    borderColor:'#fff',
  },

  lineCenter:{
    borderBottomWidth:1/PixelRatio.get(),
    borderColor:'#fff',
  },
  
});

/*注册入口，系统api*/
AppRegistry.registerComponent('MyProject', () => MyProject);
