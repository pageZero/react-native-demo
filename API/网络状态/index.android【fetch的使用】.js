/**
 * Sample React Native App
 * https://github.com/facebook/react-native

  网络状态与数据交互。
  NetInfo
  网络访问的API：fetch(推荐)，XMLHttpRequest
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    NetInfo,
    ToastAndroid,
    View,
    } from 'react-native';


class RNTest extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      isConnected:null,
      connectionInfo:null,
    };
  }

  componentDidMount() {
    //网络是否连接的监听
    //addEventListener(eventName:ChangeEventName,handler:Function)   
    //静态方法，用设置网络变化事件监听器，同时需要传入回调的处理方法
    NetInfo.isConnected.addEventListener(
      'isConnected',
      this._handleConnectivityChange
      );

    //网络连接转台变化的监听
    NetInfo.addEventListener(
      'statusChange',
      this._handleNetStatusChange
      );

    //检测网络是否连接
    NetInfo.isConnected.fetch().done(
      (isConnected) => {this.setState({isConnected});}
      );

    //检测网络连接信息,这只到state中，触发render函数
    NetInfo.fetch().done(
      (connectionInfo) => {this.setState({connectionInfo});}
      );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'isConnected',
      this._handleConnectivityChange
      );
    NetInfo.removeEventListener(
      'statusChange',
      this._handleNetStatusChange
      );
  }

  _handleConnectivityChange(isConnected) {
    ToastAndroid.show((isConnected ? 'online' : 'offline'),ToastAndroid.SHORT);
  }
  _handleNetStatusChange(status) {Aq·
    ToastAndroid.show('当前网络状态：'+status,ToastAndroid.SHORT);
  }

  render() {
    return(
      <View >
        <Text style={styles.welcome}>
            当前的网络状态
        </Text>
        <Text style={styles.welcome}>
           {this.state.isConnected ? '网络在线' : '离线'}
        </Text>
        <Text style={styles.welcome}>
            当前网络连接类型
        </Text>
        <Text style={styles.welcome}>
            {this.state.connectionInfo}
        </Text>
        <Text style={styles.welcome}>
            当前连接网络是否计费
        </Text>
        <Text style={styles.welcome}>
          {NetInfo.isConnectionExpensive === true ? '需要计费' : '不要'}
        </Text>
{/*}
        <Text onPress={this.goPostNet1.bind(this)} style={styles.btn}>
        fetch-POST访问网络
        </Text>
        <Text onPress={this.goGetNet.bind(this)} style={styles.btn}>
        fetch-POST访问网络
        </Text>
      */}
      </View>
      );
    
  }
/*  render() {
    
    return (
      <List navigator={this.props.navigator} />
    );
  }
  */
  goPostNet1() {
    ToastAndroid.show('fetch-POST访问网络-方法1',ToastAndroid.SHORT);
    let url = 'http://www.5iqunzi.com/wenjiaosuo/admin/privilege.php';
    let map = {method:'POST'};

    let privateHeaders = {
      'Private-header1':'value1',
      'Private-header2':'value2',
      'Content-Type':'text/plain',
      'User-Agent':'testAgent',
    };

    //定义请求体
    map.body = JSON.stringify(
    {
      'username':'136...',
      'password':'dfy889',
      'act':'singnin',

    });

    //如果服务器无法识别上面的Post的数据格式，可以使用form格式
    //from格式：map.body = 'username=136&password=dfy889&act=signin';

    map.follow = 10;//设置请求允许的最大重定向次数，0表示不允许重定向
    map.timeout = 8000;//设置超时时间，0为没有超时时间，这个值在重定向时会被重置

    map.size = 0;//设置请求回应中的消息体最大允许长度，0为没有限制

    console.log('fetch-POST访问网络-方法1');
    fetch(url, map).then(
      (response) => {
        console.log('fetch-第一个then里面');
        return response.text();
      }
      //(response) => response.text();不用大括号可以这样简写
      ).then(
        (responseText) => {
          //这里不能用console,否则看不到
          //用alert可以
          alert('服务器返回：'+responseText);
        }
      ).catch(
      (err) => {
        console.log('错误:'+err);
      });
  }

/*
  goPostNet2() {
    ToastAndroid.show('fetch-POST访问网络-方法2',ToastAndroid.SHORT);
    let url = 'http://www.5iqunzi.com/wenjiaosuo/admin/privilege.php';
    let data = {
      'username':'139',
      'password':'dfy889',
      'act':'singnin',
    };
    console.log('fetch-POST访问网络-方法2');
    //封装一下，没有写
    this.postRequest(url, data, (result) => {
      alert('服务器返回结果'+result);
    });
  } 
  */

  goGetNet() {
    ToastAndroid.show('fetch-GET访问网络',ToastAndroid.SHORT);
    console.log('GET0-访问网络');
    let url = 'http://www.reactnative.vip/';
    fetch(url).then(
      (response) => {
        console.log('第一个then里面');
        return response.text();
      }).then(
      (responseText) => {
        alert('服务器返回结果：'+responseText);
      }).catch(
      (err) => {
        console.log('err:'+err);
      });
  }
  
}



const styles = StyleSheet.create({
  welcome: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
  },
  btn:{
    textAlign:'center',
    backgroundColor:'#777',
    marginTop:10,
  }
});

AppRegistry.registerComponent('RNTest', () => RNTest);
