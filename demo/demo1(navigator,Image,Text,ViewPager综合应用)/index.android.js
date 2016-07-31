/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ViewPagerAndroid,
  Navigator,
  View
} from 'react-native';

import LikeCount from './LikeCount.js';//导入喜欢数组件
import Button from './Button.js';//导入自定义按钮的组件
import HomeUI from './HomeUI.js';//导入首页组件

const PAGES = 5;
const BGCOLOR=['#fdc08e','#fff6b9','#99d1b7','#dde5fe','#f79273'];

const IMAGE_URIS=[
'https://www.baidu.com/img/bd_logo1.png',
'http://offlintab.firefoxchina.cn/static/img/Logo.png',
'http://img3.imgtn.bdimg.com/it/u=232006007,1376152174&fm=206&gp=0.jpg',
'http://img5.imgtn.bdimg.com/it/u=3065371587,1320735132&fm=206&gp=0.jpg',
'http://img2.imgtn.bdimg.com/it/u=2066458365,3889926579&fm=206&gp=0.jpg'];

/*需要配置路由和场景，是为了点击去到首页时，用导航navigator跳转到首页*/
class RNDemo1 extends Component {
  render() {
    let defaultName='WelcomeUI';
    let defaultComponent=WelcomeUI;
    return (
      <Navigator
        initialRoute={{name:defaultName, component:defaultComponent}}
        //配置场景
        configureScene={
          (route) => {
            return Navigator.SceneConfigs.FloatFromRight;
          }
        }

        renderScene={
          (route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }
        }
      />
    );
  }
}

//引导页面
class WelcomeUI extends Component{

  //引导页或者欢迎页面，用ViewPager实现
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      animationsAreEnabled: true,//动画是否开启
      progress: {
        position: 0,
        offset: 0,
      },
    };
  }

  //去到首页的点击事件
  onClick=()=>{
    const { navigator } = this.props;//获取到配置好的navigator
    if(navigator) {
      navigator.push({
        name: 'HomeUI',
        component: HomeUI,
      })
    }
  }

  onPageScroll=(e) => {
    //页面切换时回调，按钮点击或滑动手势
    //回调参数e.nativeEvent对象会包括两个数据：
    //position 从左数起第一个当前可见的页面的下标。
    //offset 一个在[0,1)之间的范围，代表当前页面切换的状态。值x表示现在"position"所表示的页有(1 - x)的部分可见，而下一页有x的部分可见。
   
    this.setState({progress:e.nativeEvent});
  }

  onPageSelected=(e)=>{
    //这个回调会在页面切换完成后（当用户在页面间滑动）调用
    //回调参数中的event.nativeEvent对象,传回当前的位置
    this.setState({page:e.nativeEvent.position});
  }

  //去到固定下标的页面，要改变状态
  go(page){
    if(this.state.animationsAreEnabled){
      this.viewPager.setPage(page);
    }else{
      this.viewPager.setPageWithoutAnimation(page);
    }
    //刷新了
    this.setState({page});
  }

  move(delta){
    var page=this.state.page+delta;
    this.go(page);
  }

  render(){
    const thunbsUp='\uD83D\uDC4D';
    //数组pages里面存储的是ViewPager滚动的视图，有5个视图，视图中的图片和背景都不一样
    var pages=[];
    for (var i = 0;i<PAGES;i++) {
      var pageStyle = {
        backgroundColor: BGCOLOR[i % BGCOLOR.length],
        alignItems: 'center',
        padding: 20,
      };
      if(i < PAGES -1) {
        //前面几个viewPager

        /*collapsable 如果一个View只用于布局它的子组件，
        则它可能会为了优化而从原生布局树中移除。把词属性设置为false，可以禁用这种优化
        */
        pages.push(
          <View key={i} style={pageStyle} collapsable={false}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{uri: IMAGE_URIS[i % BGCOLOR.length]}}
              />
              <LikeCount />
          </View>
        );
      } else {
        //最后一个viewPager 要加一个去到首页的按钮
        pages.push(
          <View key={i} style={pageStyle} collapsable={false}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{uri: IMAGE_URIS[i % BGCOLOR.length]}}
            />

            <LikeCount />

          {/*点击这里会去到首页，使用Navigator来控制跳转*/}
            <TouchableOpacity onPress={this.onClick} style={styles.startupButton}>
                <Text style={styles.likesText}>{thunbsUp+'启动首页'}</Text>

              </TouchableOpacity>
          </View>);
      }//if
    }//for

    //声明两个变量，从state中取值
    var {page,animationsAreEnabled} = this.state;
    //var page=this.state.page;
    //var animationsAreEnabled=this.state.animationsAreEnabled;

    return (
      <View style={styles.container}>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}
          onPageScroll={this.onPageScroll}
          onPageSelected={this.onPageSelected}
          ref={viewPager => {this.viewPager = viewPager;}}
          >
        {/*数组中的视图填充到ViewPager中*/}
          {pages}
          <View><Text>hello</Text></View>
        </ViewPagerAndroid>

      {/*关闭动画的视图*/}
        <View style={styles.buttons} >
          {animationsAreEnabled ?
            <Button
              text="Turn off animations"
              enabled={true}
              onPress={() => this.setState({animationsAreEnabled:false})}
            />
            : <Button
              text="Turn animations back on"
              enabled={true}
              onPress={() => this.setState({animationsAreEnabled:true})}

            /> 
          }
        </View>

        {/*切换图片按钮的视图*/}
        <View style={styles.buttons} >
          <Button text="Start" enabled={page > 0} onPress={() => this.go(0)} />
          <Button text="Prev" enabled={page > 0} onPress={() => this.move(-1)} />

          <Text style={styles.buttonText} >页：{page + 1} / {PAGES}</Text>

          <ProgressBar size={100} progress={this.state.progress} />
          <Button text="Next" enabled={page < PAGES-1} onPress={() => this.move(1)} />
          <Button text="Last" enabled={page < PAGES-1} onPress={() => this.go(PAGES - 1)} />

        </View>

      </View>
      );

  }//render


}

class ProgressBar extends Component{
  //进度条组件
  constructor(props) {
    super(props);//从父组件获得属性 size progress
  }

  render() {
    //当前位置+偏移量
    var fractionalPosition = (this.props.progress.position + this.props.progress.offset);

    //计算当前的进度条宽度
   // var progressBarSize = (fractionalPosition / (PAGES -1)) * this.props.size;
    var progressBarSize = (fractionalPosition / (PAGES - 1)) * this.props.size;
    return(
      //进度条，两个view搞定
      //progressBarSize当前进度
      //this.props.size总进度大小
      
      <View style={[styles.progressBarContainer, {width:this.props.size}]} >
        <View style={[styles.progressBar, {width:progressBarSize}]} />
      </View>

      );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },

  startupButton:{
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
    padding: 8,
  },


  progressBarContainer: {
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#ff0000',
  },
  viewPager: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
  },
});

AppRegistry.registerComponent('RNDemo1', () => RNDemo1);
