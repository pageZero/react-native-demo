/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  NativeModules,
  ToastAndroid,
  Text,
  View
} from 'react-native';

class CustomButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
class RNDemo4 extends Component {

//调用原生方法
  toActivity() {
    var intent = NativeModules.IntentNativeModule;
    intent.startActivityFromJS( "com.rndemo4.ShowActivity","从JS传过来的参数：456");
  }

//调用原生方法，接收返回数据
  toActivityForResult() {
    var intent = NativeModules.IntentNativeModule;
    intent.startActivityFromJSGetResult("com.rndemo4.ThreeActivity", 200,
    (msg) => {
      ToastAndroid.show('JS界面:从Activity中传输过来的数据为:'+msg, ToastAndroid.SHORT);
    }, (err) => {
      ToastAndroid.show("JS界面：错误信息为"+err,ToastAndroid.SHORT);
    });
  }

  render() {
    return (
     <View>
      <Text style={styles.welcome}>
        RN跳转到原生Activity页面,数据交互
      </Text>
      <CustomButton 
        text="点击跳转到Activity界面"
        onPress={this.toActivity}
      />
      <CustomButton 
        text="点击跳转到Activity界面，并等待返回数据"
        onPress={this.toActivityForResult}
      />
     </View>
    );
  }
  
  //当组件挂载之后，调用原生方法，返回数据（和上面接收原生返回的数据是一样的）
   componentDidMount(){
    var callNativeGetData = NativeModules.IntentNativeModule;
    callNativeGetData.dataToJS((msg) => {
      ToastAndroid.show("JS界面：组件挂载时自动获取原生返回的消息--"+msg,ToastAndroid.SHORT);
    },(result) => {
      ToastAndroid.show('JS界面:错误信息为:'+result,ToastAndroid.SHORT);
    });
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  button:{
    margin:5,
    padding:15,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'#cdcdcd',
  },
  buttonText:{
    fontSize:16,
    textAlign:'center',
  },
});

AppRegistry.registerComponent('RNDemo4', () => RNDemo4);
