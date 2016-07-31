
import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

//开始 前进 后退 最后一个 几个按钮的通用写法
export default class Button extends Component {

	constructor(props) {
	  super(props);//接收属性：text enabled onPress
	
	  this.state = {};
	}

	_handlePress=() => {

		if(this.props.enabled && this.props.onPress){
			//按钮可以按，没有变灰，则启用按钮的onPress方法
			this.props.onPress();
		}
	}

  render() {
    return (
    	<TouchableOpacity onPress={this._handlePress}>
    {/*View有两个样式，判断按钮是否可用，来显示不同的样式*/}
    		<View style={[styles.button, this.props.enabled ? {}:styles.buttonDissabled]}>
    		<Text  style={styles.buttonText}>{this.props.text}</Text>
    		</View>

    	</TouchableOpacity>
      
    );
  }
}

const styles = StyleSheet.create({
button:{
	flex: 1,
    
    margin: 5,
    borderColor: 'gray',
    borderRadius:3,
    borderWidth: 1,
    backgroundColor: 'gray',
},
buttonDissabled:{
	backgroundColor: 'black',
    opacity: 0.5,
},
buttonText:{
	color: 'white',
}
});


//export default Button;