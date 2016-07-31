/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
RN中的Image组件:
Image组件会在图片加载完成后再渲染到视图，显示效果要好一些。
属性：1.resizeMode:图片适用模式，cover，contain，stretch
         contain比较常用，会在规定的范围内自适应显示。
      2.source：图片的引用地址。
 
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  TouchableOpacity,
  PixelRatio,
  Text,
  View
} from 'react-native';


var imgs=['https://www.baidu.com/img/bd_logo1.png',
          'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3648390168,1713673067&fm=58&s=6BC28852DD305C0354F4835E02001073',
          'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2577259750,1150388651&fm=58&s=2124D41287E16D014ECD49C6000010B3']

class RNTest extends Component {
  show(txt) {
    alert(txt);
  }
  render() {
    return (
      <View style={[styles.flex,{marginTop:45}]}>
            
            <MyImage imgs={imgs} ></MyImage>
            
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
