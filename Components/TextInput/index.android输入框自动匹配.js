/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow

 输入框自动匹配小结：
 逻辑：输入框接收输入，此时要显示下面的提示框，当选中提示框时，需要将提示框中的内容传递到输入框中显示。
 所以，需要两个参数，一个boolean型的show,控制提示框是否显示； ==>this.state.show
                     value，用于记录输入框的值 ==>this.state.value
                     ==>通过在state中添加传递的参数。

 三个方法：构造函数==>添加show,value两个参数。
           hide(val)==>隐藏提示框的方法，在点击提示框的时候调用，将提示框的文本当做参数传递进来，
            设置为value，并且隐藏提示框。
           getValue(text) ==>在输入框的内容发生变化时调用，要根据输入框改变提示内容。参数是输入框的值，
                            在onChangeText的时候调用。注意这里半点事件时，只需传递this


 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  PixelRatio,
  Text,
  View
} from 'react-native';

/*获取屏幕最小的像素密度*/
var onePT = 1 / PixelRatio.get();

class RNTest extends Component {
  render() {
    return (
      <View style={[styles.flex,styles.topStatus]}>
            <Search></Search>
        </View>
    );
  }
}

class Search extends Component {

  //show boolean this.state
  //value 显示的值

  constructor(props) {
    super(props);
  
    this.state = {
      show:false,
      value:null,
    };
  }

/*点击输入框下面的提示之后，要隐藏提示列表，并把输入框的值设置为选中的提示的值*/
  hide(val) {
    this.setState({
      show:false,
      value:val,
    });
  }

  /*输入框内容改变时，会调用这个方法,这个方法是有参数的，
  但是它绑定的是onChange方法，默认参数是改变的文本，eg:调用onChangeText={this.getValue.bind(this)}
  调用时不用加参数*/
  getValue(text) {
    this.setState({
      show:true,
      value:text,
    });
  }

    render(){
        return (
            <View style={styles.flex}>
              <View style={styles.flexDirection}>
                  <View style={[styles.flex,styles.input]}>
                    <TextInput 
                      keyboardType="web-search"
                      placeholder="请输入关键词"
                      value={this.state.value} 
                      onChangeText={this.getValue.bind(this)}/>
                  </View>

                  <View style={styles.btn}>
                      <Text style={styles.search}>搜索</Text>
                  </View>
              </View>

               {/*判断是否显示提示列表,一个三元运算*/}
              {this.state.show?
                <View style={styles.result}>
                  <Text onPress={this.hide.bind(this,this.state.value + '加郑佳丽QQ')} 
                    style={styles.item} numberOfLines={1}>
                    {this.state.value}加郑佳丽QQ
                  </Text>
                  <Text onPress={this.hide.bind(this,this.state.value + '园街')} 
                    style={styles.item} numberOfLines={1}>
                    {this.state.value}园街
                  </Text>
                  <Text onPress={this.hide.bind(this,80 + this.state.value + '综合商店')} 
                    style={styles.item} numberOfLines={1}>
                    80{this.state.value}综合商店
                  </Text>
                  <Text onPress={this.hide.bind(this,this.state.value + '啦啦')} 
                    style={styles.item} numberOfLines={1}>
                    {this.state.value}啦啦
                  </Text>

                </View>
                :null
              }
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
  btn:{
    width:45,
    marginLeft:-5,
    marginRight:5,
    backgroundColor:'#23BEFF',
    height:45,
    justifyContent:'center',
    alignItems:'center',
  },
  search:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold',
  },
  item:{
    fontSize:16,
    paddingTop:5,
    paddingBottom:10,
  },
  result:{
    marginTop:onePT,
    marginLeft:18,
    marginRight:5,
    height:200,
  },
});

AppRegistry.registerComponent('RNTest', () => RNTest);
