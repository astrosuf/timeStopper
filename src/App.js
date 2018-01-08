import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';

import {Header, Text} from 'native-base';
import TimeFormatter  from 'minutes-seconds-milliseconds';

let laps = [
    {name: 'Username 1', value: '00.00.001'},
    {name: 'Username 2', value: '00.00.002'},
    {name: 'Username 3', value: '00.00.003'},
    {name: 'Username 4', value: '00.00.004'},
    {name: 'Username 5', value: '00.00.005'},
];
let ds = new ListView.DataSource({rowHasChanged: (row1, row2)=> row1 != row2});
export default class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            dataSource: ds.cloneWithRows(laps),
            isRunning: false,
            mainTimer: null,
            lapTimer: null,
            mainTimerStart: null,
            lapTimeStart: null
        }
    }

    _renderTimers(){
        return (
            <View style = {styles.timeWrapper}>
                <View style={styles.timeWrapperInner}>
                    <Text style={styles.lapTimer}>Previous Time: {TimeFormatter(this.state.lapTimer)}</Text>
                    <Text style={styles.mainTimer}>{TimeFormatter(this.state.mainTimer)}</Text>  
                </View>
            </View>
        )
    }

    handleStartStop(){
        let {isRunning, mainTimer, lapTimer} = this.state;
        
        this.setState({
            mainTimerStart: new Date(),
            isRunning: true
        });

        this.interval = setInterval(() => {
            this.setState({
                mainTimer: new Date() - this.state.mainTimerStart + mainTimer,
            })
        }, 30);
        
    }

    stopTimer() {
        let {isRunning, mainTimer} = this.state;
        let tempTime = mainTimer
        if(isRunning){
            clearInterval(this.interval);
            this.setState({isRunning: false, mainTimer:null, lapTimer:tempTime});
            return;
        }
    }

    _renderButtons(){
        return (
            <View style = {styles.buttonWrapper}>
                <TouchableHighlight underlayColor="#777" style={styles.button} onPressIn={this.handleStartStop.bind(this)} onPressOut={this.stopTimer.bind(this)} delayPressOut={10}>
                    <Text style={[styles.startBtn, this.state.isRunning && styles.stopBtn]}> {this.state.isRunning ? 'Stop' : 'Start'} </Text> 
                </TouchableHighlight>
            </View>
        )
    }



    _renderLaps(){
        return (
            <View style = {styles.lapWrapper}>
                <Text> Top 5 Global Records:</Text>
                <ListView 
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => (
                        <View style= {styles.lapRow}>
                            <Text style={styles.lapNumber}>{rowData.name}</Text>
                            <Text style={styles.lapTime}> {rowData.value}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
  
    render() {
        return (
            <View style={styles.container}>
                <Header text="Time stopper">
                    <Text> Time Stopper </Text>
                </Header>
                <View style={styles.top}> 
                    {this._renderTimers()}
                </View> 
                <View style={styles.bottom}> 
                    {this._renderButtons()}
                    {this._renderLaps()}
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
  },
  timeWrapperInner: {
    //   borderWidth: 0.5,
      alignSelf: 'center'
  },
  mainTimer: {
      fontSize: 60,
      fontWeight: '100',
      alignSelf: 'flex-end'
  },
  lapTimer: {
      fontSize: 18,
      alignSelf: 'flex-end'
  },
  timeWrapper:{
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      flex: 1
  }, 
  buttonWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 30
  },
  button: {
      height: 80,
      width: 80,
      borderRadius: 40,
      backgroundColor: "#fff",
      justifyContent:"center",
      alignItems: 'center'
  },
  lapRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 40,
      paddingTop: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ddd'
  },
  lapNumber: {
      fontSize: 16,
      color: '#777',
  },
  lapTime:{
      color: '#000',
      fontSize: 20,
      fontWeight: '300'
  },
  startBtn: {
      color: '#00cc00'
  },
  stopBtn: {
      color: 'red'
  }
});
