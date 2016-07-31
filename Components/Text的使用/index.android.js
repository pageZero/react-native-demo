/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 思路：先构建一个Header，然后在主文件中作为组件引入；
       2. 第一部分是一个列表 ，构建一个List组件，List里面包含一个View和一个Text，List自带title属性，在Text中
        显示这个属性的值；
       3.下面是一个重要新闻的列表，这一次不在使用List组件来一个一个显示，而是使用一个组合组件ImportantNews,
          这个组件需要带有一个news属性，所有要显示的内容都从news标签获取，所以在视图渲染时要先遍历这个属性。
          在外部声明一个组件的遍历news[],用来存储每次遍历标签之后的到的Text的视图，那个news里面就是存储多个Text
          return的时候可以直接使用{news}来显示多个Text视图。
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  Text,
  View
} from 'react-native';

/*引入组件*/
const Header = require('./header');

/*创建组件*/
class MyProject extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <Header></Header>

        <List title ='一线城市楼市退烧 有房源一夜跌价160万'> </List> 
        <List title = '上海市民称墓地太贵买不起'> </List > 
        <List title = '朝鲜再发视频'> </List> 
        <List title = '生活大爆炸'> </List >

        <ImportantNews news={[
          '解放军报报社大楼正在拆除 标识已被卸下(图)',
          '韩国停签东三省52家旅行社 或为阻止朝旅游创汇',
          '南京大学生发起亲吻陌生人活动 有女生献初吻-南京大学生发起亲吻陌生人活动 有女生献初吻-南京大学生发起亲吻陌生人活动 有女生献初吻',
          '防总部署长江防汛:以防御98年量级大洪水为目标'

        ]}>
        </ImportantNews>
      </View>
    );
  }
}

class List extends Component {
  render() {
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_font}>{this.props.title}</Text>

      </View>
    );
  }
}

class ImportantNews extends Component {
  show(title) {
    alert(title);
  }

  render() {

    var news = [];

    for (var i in this.props.news) {
      var text = (
        <Text
          onPress={this.show.bind(this.props.news[i])}
          numberOfLines={2}
          style={styles.news_item}
          key={i}
          >{this.props.news[i]}</Text>
      );
      news.push(text); /*把定义好的变量text push到外部的数据变量news中*/
    }
    return (
      <View style={styles.flex}>
          <Text style={styles.new_title}>今日要闻</Text>

            {news}
        </View>

    );
  }
}


/*添加样式表*/
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    /*平分*/
  },
  list_item: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },

  list_item_font: {
    fontSize: 16,
  },

  new_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#cd1d1c',
    marginLeft: 10,
    marginTop: 15,
  },

  news_item: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    lineHeight: 40,
  },

});

/*注册入口，系统api*/
AppRegistry.registerComponent('MyProject', () => MyProject);