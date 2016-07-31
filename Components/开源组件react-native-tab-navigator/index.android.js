/**
 * Sample React Native App
 * https://github.com/facebook/react-native

使用第三方组件react-native-tab-navigator实现tab效果。
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


import TabNavigator from 'react-native-tab-navigator';

class RNTest extends Component {

 constructor(props) {
   super(props);
 
   this.state = {
    selectedTab:'home',
   };
 }

  render() {
    var homeView = (
        <View style={[styles.flex, styles.center, {backgroundColor:'#9DD6EB'}]}>
          <Text style={{fontSize:22, color:'#fff'}}>我是主页</Text>

        </View>
      );

    var settingView = (
        <View style={[styles.flex, styles.center ,{backgroundColor:'#97CAE5'}]}>
          <Text style={{fontSize:22, color:'#fff'}}>我是设置页面</Text>

        </View>
      );
   
    return (
      <TabNavigator
      tabBarStyle={{ height: 60}}>
        <TabNavigator.Item
        //=== 不止判断值，还判断类型
          selected={this.state.selectedTab === 'home'}
          title="主页"
          renderIcon={() => <Image style={styles.img} source={require('./img/tab_home_normal.png')} />}
          renderSelectedIcon={() => <Image style={styles.img} source={require('./img/tab_home_pressed.png')} />}
          badgeText="1"
          onPress={() => this.setState({ selectedTab: 'home' })}>
        {/*设置好属性之后，显示首页视图*/}
          {homeView}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'setting'}
          title="设置"
          renderIcon={() => <Image style={styles.img} source={require('./img/tab_setting_normal.png')} />}
          renderSelectedIcon={() => <Image style={styles.img} source={require('./img/tab_setting_pressed.png')} />}
          renderBadge={() => <Text>zero</Text>}
          onPress={() => this.setState({ selectedTab: 'setting' })}>
          {settingView}
        </TabNavigator.Item>
      </TabNavigator>

     
      );
  }

  
}



const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
  img:{
    width:35,
    height:35,
  }

});

AppRegistry.registerComponent('RNTest', () => RNTest);
