/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  Text,
  View
} from 'react-native';


 var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
export default class HomeUI extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      movies:null,//放自己定义的state变量及初始值
    };
  }

  goBack() {
    const {navigator} = this.props;
    if(navigator) {
      //当前页面出栈
      navigator.pop();
    }
  }

  renderLoadingView(){
    return (
      <View style={styles.container}>
        <Text>
          正在网络上请求电影数据...
        </Text>

      </View>

      );
  }

  render() {

    if(!this.state.movies){
      //如果movies为空
      return this.renderLoadingView();
    }
    //获取到的数据是一个数组
    var movie = this.state.movies[0];
    return this.renderMovie(movie);

  }

  //组件加载完之后执行，其实现在还没有获取数据
  componentDidMount() {
    this.fetchDate();//现在真正开始获取数据
  }

  //调用网络API fetch获取数据
  //setState会出啊一次重新渲染的流程，此时render函数被触发，this.state.movies不为null
  fetchDate() {
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            movies:responseData.movies,
          });
        })
        .done();
        //调用done()-----这样可以抛出异常，而不是简单的忽略
  }

  //渲染一个电影信息
  renderMovie(movie){
    return (
      <View style={styles.container} >
        <Image 
          source={{uri:movie.posters.thumbnail}}
          style={styles.thumbnail} />
        <View style={styles.rightContainer} >
          <Text style={styles.title} onPress={this.goBack.bind(this)}>标题：{movie.title}</Text>

          <Text style={styles.year} >年份：{movie.year}</Text>
        </View>

      </View>

      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail:{
    width:53,
    height:80,
  },
  rightContainer:{
    flex:1,
  },
  title:{
    fontSize:20,
    marginBottom:8,
    textAlign:'center',
  },
  year:{
    textAlign:'center'
  }

});


