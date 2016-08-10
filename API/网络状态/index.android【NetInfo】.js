/**
 * Sample React Native App
 * https://github.com/facebook/react-native

  网络状态与数据交互。
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
});

AppRegistry.registerComponent('RNTest', () => RNTest);
