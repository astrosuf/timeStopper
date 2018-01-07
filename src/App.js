import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component {

    _renderTimers(){
        return (
            <View style = {styles.timeWrapper}>
                <Text>00.00.000</Text>
                <Text>00.00.000</Text>
            </View>
        )
    }

    _renderButtons(){
        return (
            <View style = {styles.buttonWrapper}>
                <Text>Start</Text>
            </View>
        )
    }
  
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}> 
                    {this._renderTimers()}
                </View> 
                <View style={styles.bottom}> 
                    {this._renderButtons()}
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  top:{
      flex:1
  },
  bottom: {
      flex: 2,
      backgroundColor: '#F0EFF5'
  }
});
