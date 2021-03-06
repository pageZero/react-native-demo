
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

//喜欢数组件
export default class LikeCount extends Component {
  
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	likes:0,
	  };
	}

	onClick=()=>{
		this.setState({likes:this.state.likes + 1 });
	}

  render() {

  	//点赞的小图标
  	const thunbsUp='\uD83D\uDC4D';
    return (
      <View style={styles.likeContainer} >
      	<TouchableOpacity  onPress={this.onClick} style={styles.likeButton}>
      		<Text style={styles.likesText} >{thunbsUp+'Like'}</Text>
      	</TouchableOpacity>

      	<Text style={styles.likesText}>{this.state.likes+'个喜欢'}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

likeContainer:{
	flexDirection: 'row',
},
likeButton:{
	backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 8,
    padding: 5,
},
likesText:{
	flex: 1,
    fontSize: 18,
    alignSelf: 'center',
}

});

