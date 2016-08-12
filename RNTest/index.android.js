/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 定时器与手机定位。
 moment.js 时间管理的js库。
 Geolocation：使用Geolocation时，要在AndroidManifest.xml文件中加入权限
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
需要重新编译。

安装moment，用于时间管理。
安装：npm install moment --save
使用：import moment from 'moment';
moment().format('YYYY-MM-DD HH:mm:ss')
 

 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    ToastAndroid,
    View,
    } from 'react-native';

import moment from 'moment';
import Geolocation from 'Geolocation';

let lastTime = 0;
let currentTime = 0;

class RNTest extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      width:0,
    };
  }
  
  render() {

    console.log('render');
    let css = [];
    css.push(styles.progress);
    if(this.state.width) {
      css.push({width:this.state.width});
    }


    return(
      <View >
        <Text onPress={this._setInterval} style={styles.btn}>
        setInterval
        </Text>
        <View style={css}></View>

      </View>
      );
    
  }
/*  render() {
    
    return (
      <List navigator={this.props.navigator} />
    );
  }
  */
  _setInterval() {
    console.log('获取网页数据-当前时间为：'+moment().format('YYYY-MM-DD HH:mm:ss'));

    this.interval = setInterval(() => {
      fetch('http://www.reactnative.vip/')
      .then(function (data) {
        return data.text();
      })
      .then((responseText) => {
        console.log('返回了数据，时间为：'+moment().format('YYYY-MM-DD HH:mm:ss'));
        console.log(responseText);
      })
      .catch((err) => {
        console.warn(err);
      });
    },5000);
  }
  
  componentDidMount() {
    var _that = this;
    //5秒会后获取手机位置
    alert('开始要取位置'+moment().format('YYYY-MM-DD HH:mm:ss'));
    
    //设置超时时间，5秒之后执行
    this.timer = setTimeout(() => {
      Geolocation.getCurrentPosition((data) => {
        //为了看到效果，不用console输出
        //同时记得计时器一定要全部清空，否则会有问题，而且一时看不出来
        alert('5秒之后得到的位置信息：'+JSON.stringify(data)+'当前时间为：'+moment().format('YYYY-MM-DD HH:mm:ss'));
      }, (e) => {
        alert(JSON.stringify(e));
      });
    },5000);

    //设置立即执行
    this.immediate = setImmediate(() => {
      console.log('立即执行，当前时间：'+moment().format('YYYY-MM-DD HH:mm:ss'));
    });

    //定义动画
    function doAnimated() {
      _that.setState({
        width:_that.state.width + 10
      });
      //获取当前时间
      currentTime = new Date().getTime();

      console.log('当前的宽度：'+_that.state.width+'当前时间：'+currentTime+'--------时间间隔：'+(currentTime-lastTime));
      console.log('当前的宽度：'+_that.state.width+'当前时间：'+moment().format('YYYY-MM-DD HH:mm:ss'));
      lastTime = currentTime;
      if (_that.state.width < 300) {
        //宽度小于300，就循环执行动画
        requestAnimationFrame(doAnimated);
      }
    }

    //设置执行的动画
    //它会等上一个动画执行结束才开始执行
    requestAnimationFrame(doAnimated);
  }

  componentWillUnmount() {
    //如果存在this.timer，则使用clearTimeout清空。
    //如果你使用多个timer,那么用多个变量，或者用个数组来保存引用，然后再逐个clear
    this.timer && clearTimeout(this.timer);
    this.immediate && clearImmediate(this.immediate);
    this.interval && clearInterval(this.interval);

    console.log('清空了所有的计时器');
  }
  
}




const styles = StyleSheet.create({
  welcome: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
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
