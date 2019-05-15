import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import Info from './Info';
import LEDValue from './LEDValue';
import SensorValue from './SensorValue';

import Icon from 'react-native-vector-icons/FontAwesome5';
import sensorStyles from '../styles/sensor';
import ledStyles from '../styles/led';

export default class Value extends Component {
  render() {
    let info = this.props.info;
    let request = this.props.request;
    let value = this.props.value;
    let type = this.props.type;
    let styles = type === "sensor" ? sensorStyles : ledStyles;
    return (
      <View style={[styles.container, styles.shadow, styles.box]}>
        { request && request.status === 'pending' && <ActivityIndicator size='large'/> }
        { request && request.status === 'error'   && <Icon name='exclamation-triangle' size={50} color='red' /> }
        {
          request && request.status === 'success' ?
            info ?
              <Info value={value}/> :
              type === "sensor" ?
                <SensorValue value={value}/> :
                <LEDValue value={value}/>
          : null
        }
      </View>
    );
  }
}
