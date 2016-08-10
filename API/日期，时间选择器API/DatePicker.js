'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  DatePickerAndroid,
  Text,
  View,
} from 'react-native';

export default class DatePicker extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	result:'default',
	  };
	}

	componentWillMount() {
		let self = this;
		let today = new Date();
		let theMinDate = new Date(2015,1,1);
		let theMaxDate = new Date(2025,1,1);
		//定义一个对象，设置最小日期和最大日期
		let option = {
			date: today,
			minDate: theMinDate,
			maxDate: theMaxDate,
		};

		//打开日期选择器对话框
		DatePickerAndroid.open(option).then(
			result => {
				//取消了，没有选择日期
				if(result.action === DatePickerAndroid.dismissedAction) {
					self.setState(
						{
							result:'用户没有选择日期',
						});
				} else {
					self.setState({
						result:'用户选择了'+result.year+'年'+
						(result.month + 1) + '月'+result.day+'日',
					});
				}
			}

		);

	}


  render() {
    return (
      <View style={[styles.container,styles.center]}>
      	<Text style={[styles.center, styles.font]}>{this.state.result}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

	container:{
		flex:1,
	},
	center:{
		justifyContent:'center',
		alignItems:'center',
	},
	font:{
		fontSize:16,
	},
});


