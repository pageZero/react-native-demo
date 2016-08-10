/**
 * Sample React Native App
 * https://github.com/facebook/react-native

  CameralRoll:
  提供了对手机中保存的图片，视频文件进行遍历访问与操作。
  两个静态方法：
  static getPhotos(params: object):得到所有的图片和视频资源。
  params:参数类型是一个对象。定义一些筛选规则，有4个成员变量。
        |-first
        |-groupTypes:Android下没什么作用。
        |-assetType:类型，Photos, Video,All
        |-after:上一次获取图片的结束位置。
  返回一个带有图片标识符的JSON对象的Promise.(是异步任务)

  static saveImageWithTag:保存图片到本地
  [该方法在Android中不好用]
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    CameraRoll,
    ToastAndroid,
    View,
    } from 'react-native';

//定义CameraRoll的get方法的参数
let fetchParams = {
  first:10,
  assetType:'Photos',
}

let imgUrl = 'http://www.reactnative.vip/img/';

class RNTest extends Component {
  
constructor(props) {
  super(props);

  this.state = {
    images:[]
  };
}

  render() {
    return(
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Image resizeMode='stretch'
              style={[styles.m5]}
              source={{uri:imgUrl+'reactnative.png'}}
              />
          </View>

          <View style={styles.flex}>
            <Image resizeMode='stretch'
              style={[styles.m5,styles.img]}
              source={{uri:imgUrl+'dongfangyao888.jpg'}}
              />
          </View>
        </View>

        <View>
          <Text onPress={this.saveImg.bind(this,'dongfangyao888.jpg','reactnative.png')}
            style={styles.saveImg}>
            保存图片到相册
          </Text>
        </View>

        <View style={styles.imageGrid}>
        {
          this.state.images.map((image) =>
            <Image
            style={styles.image}
            resizeMode='stretch'
            source={image}
            key={image.uri}
            />
            )
        }
        </View>
      </ScrollView>
      );
    
  }
/*  render() {
    
    return (
      <List navigator={this.props.navigator} />
    );
  }
  */
  //组件加载完成后调用CameraRoll获取图片
  componentDidMount() {
    let _that = this;

    //从本地相册获取图片，设置到state的images
    CameraRoll.getPhotos(fetchParams).then(
      (data) => {
        console.log(data);
        let edges = data.edges;
        //.map是针对数字中的每个元素
        //调用回调回函，第一个参数是元素，第二个参数是下标
        let images = edges.map((edge) => {
          return edge.node.image;
        });
        //重新渲染视图
        _that.setState({
          images:images,
        });
      }).catch(error => {
        console.log('出错了'+error);
      });
  }

  saveImg(img1, img2) {
    let _that = this;
   // CameraRoll.saveImageWithTag(imgUrl+img1).then(
    CameraRoll.saveToCameraRoll(imgUrl+img1).then(
      (url) => {
        if(url) {
          console.log('first'+img1);
          let images = _that.state.images;
          //unshift()方法，可向数组开头添加一个或多个元素，并返回新长度
          images.unshift(
          {
            uri:url,
          });
          _that.setState({
            images:images,
          });
        }
      });
    //继续保存第二张图片
   // CameraRoll.saveImageWithTag(imgUrl+img2).then(
    CameraRoll.saveToCameraRoll(imgUrl+img2).then(
      (url) => {
        if(url) {
          console.log('first'+img2);
          let images = _that.state.images;
          //unshift()方法，可向数组开头添加一个或多个元素，并返回新长度
          images.unshift(
          {
            uri:url,
          });
          _that.setState({
            images:images,
          });
        }
      });
  }
}



const styles = StyleSheet.create({
  welcome: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
  },
  row:{
    flexDirection:'row',
  },
  flex:{
    flex:1,
  },
  m5:{
    marginLeft:5,
    marginRight:5,
    borderWidth:1,
    borderColor:'#ddd'
  },
  img:{
    width:150,
    height:150,
    margin:10,
  },
  imageGrid:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
  },
  image:{
    width:100,
    height:100,
    margin:10,
  },
  saveImg:{
    flex:1,
    height:30,
    textAlign:'center',
    marginTop:20,
    color:'#fff',
    lineHeight:20,
    borderRadius:5,
    marginLeft:5,
    marginRight:5,
    fontWeight:'bold',
    backgroundColor:'#3bc1ff',
  }
});

AppRegistry.registerComponent('RNTest', () => RNTest);
