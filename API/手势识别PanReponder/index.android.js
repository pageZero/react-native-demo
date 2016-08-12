/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 PanResponder手势识别。
 

 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    PanResponder,
    ProgressBarAndroid,
    ToastAndroid,
    View,
    } from 'react-native';


import Dimensions from 'Dimensions';

//获取手机屏幕的宽度
let totalWidth = Dimensions.get('window').width;

class RNTest extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      progress:0,
    };
  }

  //组件将要挂载时，创建监视器对象
  componentWillMount() {
    this.watcher = PanResponder.create({
      onStartShouldSetPanResponder:() => true,
      onPanResponderGrant:this._onPanResponderGrant,//处理按下事件
      onPanResponderMove:this._onPanResponderMove,//处理移动事件

    });
  }

  //回调，定义相应的事件处理
  _onPanResponderGrant = (event, gestureState) => {
    let touchPointX = gestureState.x0;//获取触摸点的横坐标
    let progress;
    if(touchPointX < 20) progress = 0;
    else {
      if(touchPointX > (totalWidth - 20)) progress = 1;
      else progress = (touchPointX - 20) / (totalWidth - 40); 
    }
    this.setState({ progress });
  }

  _onPanResponderMove = (event, gestureState) => {
    let touchPointX = gestureState.moveX;
    let progress;

    if (touchPointX < 20) progress = 0;
    else {
      if(touchPointX > (totalWidth - 20)) progress = 1;
      else progress = (touchPointX - 20) / (totalWidth - 40); 
    }
    this.setState({ progress });
  }
  render() {

    return(
      <View style={styles.container}>
        <ProgressBarAndroid
        styleAttr='Horizontal'
        indeterminate={false}
        style={styles.ProgressViewStyle}
        progress={this.state.progress}
        />
        <Text style={styles.text}>你选择了{Math.round(this.state.progress * 100)}%</Text>
        {/*指定监视区域，遍历this.watcher的所有属性，添加带这个View里面*/}
        {/*这个监视区域定位在顶部*/}
        <View style={styles.touchViewStyle}
          {...this.watcher.panHandlers} />
        

      </View>
      );
    
  }
/*  render() {
    
    return (
      <List navigator={this.props.navigator} />
    );
  }
  */
  

}




const styles = StyleSheet.create({
  welcome: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
  },
  container:{
    flex:1,
  },
  ProgressViewStyle:{
    width : totalWidth - 40,
    left:20,
    top:50,
  },
  touchViewStyle:{
    width:totalWidth - 20,
    height:40,
    backgroundColor:'transparent',
    position:'absolute',
    left:10,
    top:32,
  },
  text:{
    fontSize:30,
    left:20,
    top:70,
  },
  btn:{
    marginTop:50,
    marginLeft:10,
    marginRight:10,
    height:35,
    backgroundColor:'#3bc1ff',
    color:'#fff',
    lineHeight:24,
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center',

  },
  progress:{
    backgroundColor:'#789',
    height:10,
    marginTop:35,
  }
});

AppRegistry.registerComponent('RNTest', () => RNTest);
