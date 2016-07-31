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

    //dataBlob中存储了要显示的所有数据
    var getSectionData=(dataBlob, sectionID) => {
      return dataBlob[sectionID];
    }

    var getRowData = (dataBlob, sectionID, rowID) => {
      //通过sectionID:rowID的格式取出dataBlob中的一行数据
      return dataBlob[sectionID + ':' + rowID];
    }
  
    this.state = {
      loaded:false,
      //初始化数据源，还有一个判断行是否改变的函数
      dataSource:new ListView.DataSource({
        /*getSectionData, getRowData是新添加的两个属性，需要我们自定义处理函数*/
        getSectionData:getSectionData,
        getRowData:getRowData,
        rowHasChanged:(row1,row2) => row1 !== row2,
        //判断section头是否改变
        sectionHasChanged:(s1, s2) => s1 !== s2,
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

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <View style={styles.rowStyle} >
        <Text style={styles.rowText} >
        {rowData.gender} {rowData.name.first} {rowData.name.last}-{sectionID}-{rowID}
        </Text>

      </View>

      );
  }
  
  render() {

     if(!loaded) {
      return this.renderLoadingView();
     }

     //从网上获取数据
     return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>User List</Text>
          </View>

          <ListView
            dataSource={this.state.dataSource}
            style     ={styles.listView}
            renderRow ={this.renderRow}
            renderSectionHeader = {this.renderSectionHeader}

          />

        </View>
      );
  }

  
  renderSectionHeader = (sectionData,sectionID) => {
    return (
      <View style={styles.section}>
        <Text style={{color:'#fff'}}>片头-公司名：{sectionData}</Text>

      </View>
      );
  }

  //调用网络API fetch获取数据
  //setState会出啊一次重新渲染的流程，此时render函数被触发，this.state.movies不为null
  fetchData() {
  /*  fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            loaded:true,
            dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
          });
        })
        .done();
        //调用done()-----这样可以抛出异常，而不是简单的忽略
 */

  //组织数据
  var responseData = {
    "result":[
      {
        "organization":"马云的淘宝",
        "id":123454,
        "users":[
          {"user":{"gender":"female","name":{"first":"marga","last":"suger"},"md5":"1aaa"}},
          {"user":{"gender":"female","name":{"first":"marga","last":"suger"},"md5":"1aab"}},
          {"user":{"gender":"female","name":{"first":"marga","last":"suger"},"md5":"1aac"}},
          {"user":{"gender":"female","name":{"first":"marga","last":"suger"},"md5":"1aad"}},
          {"user":{"gender":"female","name":{"first":"marga","last":"suger"},"md5":"1aae"}},
        ]
      },
      {
        "organization":"马化腾的腾讯",
        "id":123232,
        "users":[
          {"user":{"gender":"male","name":{"first":"Jerry1","last":"suger1"},"md5":"1bba"}},
          {"user":{"gender":"female","name":{"first":"merry1","last":"suger"},"md5":"1bbb"}},
          {"user":{"gender":"male","name":{"first":"Jerry2","last":"suger2"},"md5":"1bbc"}},
          {"user":{"gender":"female","name":{"first":"merry2","last":"suger"},"md5":"1bbd"}},
          {"user":{"gender":"male","name":{"first":"Jerry3","last":"suger3"},"md5":"1bbe"}},
        ]
      },
      {
        "organization":"李彦宏的百度",
        "id":123565,
        "users":[
          {"user":{"gender":"male","name":{"first":"Joe1","last":"suger1"},"md5":"1cca"}},
          {"user":{"gender":"female","name":{"first":"merry1","last":"suger"},"md5":"1ccb"}},
          {"user":{"gender":"male","name":{"first":"Joe2","last":"suger2"},"md5":"1ccd"}},
          {"user":{"gender":"female","name":{"first":"merry2","last":"suger"},"md5":"1cce"}},
          {"user":{"gender":"male","name":{"first":"Joe3","last":"suger3"},"md5":"1ccf"}},]
      }
    ]
  };

  var organizations = responseData.result,
      length = organizations.length,
      //3个组织机构
      dataBlob = {},//一个对象
      sectionIDs = [],
      rowIDs = [],
      organization,
      users,
      userLength,
      user,
      i,
      j;
  for (i = 0; i < length; i++) {
    //某个组织机构的所有信息
    organization = organizations[i];
    //获取组织机构的ID
    sectionIDs.push(organization.id);
    //存储组织机构的名字
    dataBlob[organization.id] = organization.organization;

    users = organization.users;//所有用户
    userLength = users.length;//该组织机构一共多少人

    rowIDs[i] = [];//rowIDs是一个二维数组，没一行存储一个组织机构所有员工

    //遍历一个组织机构的所有user
    for(j = 0;j < userLength; j++) {
      user = users[j].user;
      rowIDs[i].push(user.md5);//二维数组放的都是MD5值

      dataBlob[organization.id+':'+user.md5] = user;
    }
  }

  this.setState({
    dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
    loaded:true
  });
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
  header:{
    flex:1,
    height:50,
    backgroundColor:'#9DD6EB',
  },
  headerText:{
    fontSize:16,
    textAlign:'center',
    color:'#fff',
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
  },
  section:{
    height:30,
    backgroundColor:'#92BBD9',
  },
  rowStyle:{
    borderWidth:1,
    borderColor:'#ccc',
    height:80,
    flex:1,
  },
  rowText:{
    textAlign:'center'
  }


});

AppRegistry.registerComponent('RNTest', () => RNTest);
