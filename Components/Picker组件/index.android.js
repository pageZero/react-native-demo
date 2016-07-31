/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
RN中的Picker选择器组件组件:

 
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker,
  Text,
  View
} from 'react-native';



class RNTest extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      language:null,
    };
  }
  render() {
    return (
      <View style={[styles.flex,{marginTop:45}]}>
        {/*mode:选择器样式，对话框dialog，下拉的dropdown*/} 
        {/*Picker.Item中
        label显示在选择器中，value是它对应的值*/}

        <Picker
          selectedValue={this.state.language}
          onValueChange={lang => this.setState({language:lang})}
          mode='dialog'
          style={{color:'#f00'}}>

          <Picker.Item label="Java" value="java"/>
          <Picker.Item label="JavaScript" value="js"/>
          <Picker.Item label="C语言" value="c"/>
          <Picker.Item label="PHP开发" value="php"/>
        </Picker>
            
          <Text>{this.state.language}</Text>
        </View>
    );
  }
}

class MyImage extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      /*数组下标*/
      index:0,
      imgs:this.props.imgs,
    };
  }

  goPre(){
    var index = this.state.index;
    index--;
    if(index>=0){
      this.setState({
        index:index,
      });
    }
  }

  goNext(){
    var index = this.state.index;
    index++;
    if (index<this.state.imgs.length) {
      this.setState({
        index:index,
      });
    }
  }

  render(){
    return(
      <View style={[styles.flex,{alignItems:'center'}]}>

        <View style={styles.image} >
          <Image style={styles.img} 
                resizeMode="contain"
                source={{uri:this.state.imgs[this.state.index]}}
          />

        </View>

        <View style={styles.btns} >
          <TouchableOpacity onPress={this.goPre.bind(this)}>
            <View style={styles.btn}><Text>上一张</Text></View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.goNext.bind(this)} >
          <View style={styles.btn}><Text>下一张</Text></View>
          </TouchableOpacity>


        </View>


      </View>

      );
  }
}


const styles = StyleSheet.create({
  flex:{
    flex:1,

  },
 btn:{
  width:60,
  height:30,
  borderColor:'#0089FF',
  borderWidth:1,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:3,
  marginRight:20,
 },

 btns:{
  flexDirection:'row',
  marginTop:20,
  justifyContent:'center',
 },

 img:{
  height:150,
  width:200,
 },

 image:{
  borderWidth:1,
  borderRadius:5,
  borderColor:'#ccc',
  height:250,
  width:300,
  justifyContent:'center',
  alignItems:'center',
 }
});

AppRegistry.registerComponent('RNTest', () => RNTest);
