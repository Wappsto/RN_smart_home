import React, { Component } from 'react';
import { Text } from 'react-native';

import CircleSlider from '../CircleSlider';

import styles from '../../styles/led';

export default class Brightness extends Component {
  constructor(props){
    super(props);
    this.state = {
      percent: this.calculatePercent(props.controlState.data, true)
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(percent){
    this.setState({ percent });
    let timestamp = (new Date()).toISOString();
    this.props.makeRequest('PATCH', '/state/' + this.props.controlState.meta.id, { data: percent + "", timestamp });
  }
  calculatePercent(data, isRawData){
    if(isRawData) {
      let value = this.props.value;
      return ((Number(data) - value.number.min) * 100) / (value.number.max - value.number.min);
    } else {
      return Number(data) * 100 / 360;
    }
  }
  render(){
    let value = this.props.value;
    let controlState = this.props.controlState;
    return(
      <CircleSlider
  			arcDirection='CW'
        backgroundColor='cyan'
        btnRadius={10}
        sliderRadius={70}
        sliderWidth={18}
        startDegree={270}
        maxValue={value.number.max}
        onValueChange={this.onChange}
        value={Number(controlState.data)}
        endGradient={"#A6FFCB"}
        startGradient={"#12D8FA"}
        middleText=<Text>{this.state.percent}%</Text>
  		/>
    );
  }
}
