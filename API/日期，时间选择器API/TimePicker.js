'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TimePickerAndroid,
  Text,
  View,
} from 'react-native';

export default class TimePicker extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	result:'default',
	  };
	}

	componentWillMount() {
		let self = this;
		let theHour = 18;
		let theMinute = 55;
		//是否是24小时计时
		let is24Hour = true;
		let option = {
			hour: theHour,
			minute: theMinute,
			is24Hour: is24Hour,
		};
		TimePickerAndroid.open().then(
			result => {
				if(result.action !== TimePickerAndroid.timeSetAction) {
					self.setState({
						result:'用户没有选择时间',
					}
					);
				} else {
					self.setState({
						result:'用户选择了' + result.hour+'时' + 
							result.minute + '分',
					}
					);
				}
			}).catch(
				error => {
					self.setState({
						result:'出错了'+error,
					});
				}
			);

	}

  render() {
    return (
      <View style={[styles.container,styles.center]}>
      	<Text style={[styles.font]}>{this.state.result}</Text>

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

