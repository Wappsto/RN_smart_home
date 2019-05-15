import React, { Component } from 'react';

import ColorWheel from '../ColorPicker';
import Color from 'color';

import styles from '../../styles/led';

export default class RGB extends Component {
  onChange = (color) => {
    let newColor = Color(color).rgbNumber();
    this.props.makeRequest('PATCH', '/state/' + this.props.controlState.meta.id, { data: newColor + '' });
  }
  render(){
    return(
      <ColorWheel
        initialColor={"#e24123"}
        onColorChange={this.onChange}
        style={{width: 180, height: 180}}
        thumbSize={20}
      />
    );
  }
}
