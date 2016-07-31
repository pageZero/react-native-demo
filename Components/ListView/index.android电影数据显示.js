/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    ListView,
    View,
    } from 'react-native';


var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class RNTest extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      //是否加载了数据，一开始默认不加载的
      loaded:false,
      //初始化数据源，还有一个判断行是否改变的函数
      dataSource:new ListView.DataSource({
        rowHasChanged:(row1,row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.fetchData();
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

    if(!this.state.loaded){
      //还没有数据，显示在加载数据
      return this.renderLoadingView();
    }
    //获取到的数据是一个数组
   // var movie = this.state.movies[0];
   // return this.renderMovie(movie);

   return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );

  }

  //调用网络API fetch获取数据
  //setState会出啊一次重新渲染的流程，此时render函数被触发，this.state.movies不为null
  fetchData() {
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            loaded:true,
            dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
          });
        })
        .done();
        //调用done()-----这样可以抛出异常，而不是简单的忽略
  }

  //渲染一个电影信息
  renderMovie=(movie)=>{
    return (
      <View style={styles.container} >
        <Image 
          source={{uri:movie.posters.thumbnail}}
          style={styles.thumbnail} />
        <View style={styles.rightContainer} >
          <Text style={styles.title} numberOfLines={2}>标题：{movie.title}</Text>

          <Text style={styles.year} >年份：{movie.year}</Text>
        </View>

      </View>

      );
  }
}



const styles = StyleSheet.create({

 flex:{
  flex:1,
 },
 listView:{
  marginTop:10,
  marginLeft:10,
 },
 container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail:{
    width:53,
    height:80,
  },
  rightContainer:{
    flex:1,
  },
  title:{
    fontSize:16,
    marginBottom:8,
    textAlign:'center',
  },
  year:{
    textAlign:'center'
  }


});

AppRegistry.registerComponent('RNTest', () => RNTest);
