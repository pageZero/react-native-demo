/**
 * Sample React Native App
 * https://github.com/facebook/react-native

使用AsyncStorage实现异步存储，在多个页面之间传递数据。
物理返回键back详解，BackAndroid组件。
BackAndroid接管的是整个应用的返回键，所以只用写一次代码，接管返回键的代码写在哪里呢？
就写在整个应用的入口组件的里。
把返回键接管的代码写到入口组件之后，直接使用this,props获取Navigator是获取不到的，
因为Navigator是在入口组件的子组件中才有的，所以只能是通过子组件获取。
refs给子组件命名，才能使用。
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    Navigator,
    Platform,
    BackAndroid,
    TouchableOpacity,
    ToastAndroid,
    View,
    } from 'react-native';


import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Model = [
  {
    id:'1',
    title:'咖啡1',
    desc:'咖啡1',
    price:35,
    url:'http://pic30.nipic.com/20130606/12898931_091625388147_2.jpg',
  },
  {
    id:'2',
    title:'咖啡2',
    desc:'咖啡2',
    price:56,
    url:'http://pic30.nipic.com/20130606/12898931_091625388147_2.jpg',
  },
  {
    d:'3',
    title:'咖啡3',
    desc:'咖啡3',
    price:48,
    url:'http://pic30.nipic.com/20130606/12898931_091625388147_2.jpg',
  },
  {
    d:'2',
    title:'咖啡4',
    desc:'咖啡4',
    price:55,
    url:'http://pic30.nipic.com/20130606/12898931_091625388147_2.jpg',
  },
];

class RNTest extends Component {
  //增加和移除函数的时候们必须保证是同一个函数引用，否则会出错
  componentWillMount() {
    //增加点击返回键的事件监听
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  //移除事件监听
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

   onBackAndroid = () => {
          //const { navigator } = this.props;
          //ref来命名，refs来获取子组件通过子组件获取导航器~
          const navigator = this.refs.navigator;
          const routers = navigator.getCurrentRoutes();
          console.log('当前路由长度：'+routers.length);
          if (routers.length > 1) {
              navigator.pop();
              return true;//接管默认行为
          }else{
            //实现再按一次退出应用

            //到了主页了
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
              //最近2秒内按过back键，可以退出应用。
              return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            return true;

          }
        //  return false;//默认行为，就是退出程序，而不是回到上一页

      };

  render() {
    let defaultName='List';
    let defaultComponent=List;
    return (
      <Navigator
        initialRoute={{name:defaultName, component:defaultComponent}}
        ref="navigator"
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
/*  render() {
    
    return (
      <List navigator={this.props.navigator} />
    );
  }
  */
  
}

//在购物页面取出异步存储的数据
class GouWu extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      price:0,
      data:[],
    };
  }
  //写到入口组件里去
/*

  //增加和移除函数的时候们必须保证是同一个函数引用，否则会出错
  componentWillMount() {
    //增加点击返回键的事件监听
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  //移除事件监听
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

   onBackAndroid = () => {
          const { navigator } = this.props;
          const routers = navigator.getCurrentRoutes();
          console.log('当前路由长度：'+routers.length);
          if (routers.length > 1) {
              navigator.pop();
              return true;//接管默认行为
          }
          return false;//默认行为，就是退出程序，而不是回到上一页

      };
      */

  render() {
    //第二次render的时候data不为空了
    let data = this.state.data;
    let price = this.state.price;
    let list = [];
    for(let i in data) {
      price += parseFloat(data[i].price);
      //显示购物单的列表
      list.push(
        <View style={[styles.row, styles.list_item]} key={i}>
          <Text style={styles.list_item_desc}>
            {data[i].title}
            {data[i].desc}
          </Text>
          <Text style={styles.list_item_price}>人民币：{data[i].price}</Text>
        </View>

      );
    }
    let str = null;
    if(price) {
      str = '共'+price.toFixed(2)+'元';
    }


    return (
      <ScrollView style={{marginTop:10}}>
        {list}
        <Text style={styles.btn}>支付{str}</Text>
        <Text style={styles.btn} onPress={this.clearStorage.bind(this)}>清空购物车</Text>
      </ScrollView>

      );
  }

  //在render执行后执行,取出AsyncStorage存储的数据
  componentDidMount() {
    let _this = this;
    //获取所有的键
    AsyncStorage.getAllKeys(
      function (err, keys) {
        if(err) {
          //存储数据出错
          return;
        }
        //keys是字符串数组
        AsyncStorage.multiGet(keys, function(err, result) {
          //回调函数
          //结果存在result里面，得到的结构是二维数组
          //result[i][0]表示存储的是键，result[i][1]表示存储的是值
          let arr = [];
          for(let i in result) {
            //取出所有的值
            arr.push(JSON.parse(result[i][1]));
          }

          //导致重新渲染视图
          _this.setState({
            data:arr,
          });
        });

      });
  }

  clearStorage() {
    let _this = this;
    AsyncStorage.clear(function(err) {
      if(!err) {
        _this.setState({
          data:[],
          price:0,
        });
        alert('购物车已清空');
      }
    });
  }
}

class List extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      count:0,
    };
  }

  press(data) {
    this.setState({
      count:this.state.count + 1,
    });
    //AsyncStorage异步存储
    AsyncStorage.setItem('SP-'+this.genId()+'-SP',JSON.stringify(data),function(err) {
      if(err) {
        //存储出错
        alert(err);
      } else {
        //保存成功
      //  alert('保存成功');
      }
    });
  }

  //点击结算
  goGouWu() {
    const { navigator } = this.props;//获取到配置好的navigator
    if(navigator) {
      navigator.push({
        name: 'GouWu',
        component: GouWu,
      })
    }
  }

//自动生成GUID
  genId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }

  render() {
    let list = [];
    for(let i in Model) {
      if(i % 2 === 0) {
        //==不判断类型
        //===判断类型
        let row = (
          <View style={styles.row} key={i}>
            <Item title={Model[i].title}
                  url={Model[i].url}
                  press={this.press.bind(this,Model[i])}>
            </Item>
            <Item title={Model[parseInt(i)+1].title}
                  url={Model[parseInt(i)+1].url}
                  press={this.press.bind(this,Model[parseInt(i)+1])}>
            </Item>

          </View>
          );
        list.push(row);
      }
    }

    let count = this.state.count;
    let str = null;
    if(count) {
      str = '共' + count + '件商品';
    }

    return (
      <ScrollView style={{marginTop:10}}>
      {list}
      <Text onPress={this.goGouWu.bind(this)} style={styles.btn}>去结算{str}</Text>


      </ScrollView>
      );
  }

  //在render执行后执行,取出AsyncStorage存储的数据，计算之前选中的商品数目
  //这样上次没有清空的商品也会在主页显示出来
  componentDidMount() {
    let _this = this;
    //获取所有的键
    AsyncStorage.getAllKeys(
      function (err, keys) {
        if(err) {
          //存储数据出错
          return;
        }
        //keys是字符串数组
        if(keys.length > 0) {
          _this.setState({
            count:keys.length,
          });
        }


      });
  }

  
}

class Item extends Component {
  //定义默认属性
  static defaultProps = {
    url:'http://pic30.nipic.com/20130606/12898931_091625388147_2.jpg',
    title:'默认标题',
  };
  //定义这两个属性是必须要的
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    title:React.PropTypes.string.isRequired,
  }

  render (){
    return (
      <View style={styles.item}>
    {/*调用这个组件的时候需要传递给他3个属性，url,title,press点击回调的方法*/}
        <TouchableOpacity onPress={this.props.press}>
          <Image resizeMode='contain'
            style={styles.img}
            source={{uri:this.props.url}}
          >
          </Image>
          <Text numberOfLines={1} style={styles.item_text}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
      );
  }
}


const styles = StyleSheet.create({
  item:{
    height:150,
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:5,
    flex:1,
    margin:10,
  },
  img:{
    width:150,
    height:150,
  },
  item_text:{
    backgroundColor:'rgba(0,0,0,0.5)',
    color:'#fff',
    textAlign:'center',
    marginTop:-20,
  },
  row:{
    flexDirection:'row',
    
    marginBottom:20,
  },
  btn:{
    marginTop:20,
    flex:1,
    textAlign:'center',
    backgroundColor:'#9DD6EB',
    color:'#fff',
    fontSize:16,
  },
  list_item:{
    marginLeft:5,
    marginRight:5,
    padding:5,
    height:50,
    borderColor:'#ddd',
    borderWidth:1,
    borderRadius:3,
  },
  list_item_desc:{
    flex:2,
    fontSize:15,
    
  },
  list_item_price:{
    flex:1,
    fontSize:15,
    justifyContent:'flex-end',
    textAlign:'right',
      }
});

AppRegistry.registerComponent('RNTest', () => RNTest);
