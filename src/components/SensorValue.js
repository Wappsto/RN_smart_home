import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEntity, getEntities } from 'wappsto-redux/selectors/entities';

import Timestamp from './Timestamp';
import Info from './Info';

import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles/sensor';

import chroma from 'chroma-js';

import networkData from '../networkData';

function mapStateToProps(state, componentProps){
  let value = componentProps.value;
  let reportState;
  if(value && value.meta){
    reportState = getEntity(state, 'state', { parent: value.meta, filter: { type: 'Report' } });
  }
  return {
    reportState: reportState
  };
}

const colorSchema = {
  CO2: ['60A664', 'EEC800', 'D86C00', 'C1312C'],
  Temperature: ['8AD5D7', '01B7CD', 'FDB813', 'F37020', 'C9234B'],
  Pressure: ['60A664', 'EEC800', 'D86C00', 'C1312C'],
  Humidity: ['C7F2FF', '6EADDF', '4F96D8', '357ECD', '1C68C0']
};

class SensorValue extends Component {
  getItemData(value, reportState){
    let color;
    if(colorSchema[value.name]){
      let min = value.number.min;
      let max = value.number.max;
      let index = Math.round(((reportState.data - min) * 100) / (max - min));
      color = chroma.bezier(colorSchema[value.name]).scale().colors(100)[index];
    } else {
      color = 'black';
    }
    if(networkData.data[value.name]){
      let data = networkData.data[value.name];
      return { icon: data.icon, unit: data.unit, color };
    }
    return { icon: 'question-circle', unit: '', color};
  }
  render() {
    let value = this.props.value;
    let reportState = this.props.reportState || {};
    let valueData = this.getItemData(value, reportState);
    return (
      <Fragment>
        <View style={styles.content}>
          <Icon name={valueData.icon} size={35} color={valueData.color} />
          <Text>{+Number(reportState.data).toFixed(2)} {valueData.unit}</Text>
          <Text style={styles.text}>{value.name}</Text>
        </View>
        <View style={styles.footer}>
          <Timestamp style={styles.timestamp} time={reportState.timestamp}/>
        </View>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(SensorValue);
