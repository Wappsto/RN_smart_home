import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from '../styles/info';

import { getEntities } from 'wappsto-redux/selectors/entities';

function mapStateToProps(state, componentProps){
  let value = componentProps.value;
  let controlState, reportState;
  if(value && value.meta){
    let states = getEntities(state, 'state', { parent: value.meta });
    controlState = states.find((s) => s.type === 'Control');
    reportState = states.find((s) => s.type === 'Report');
  }
  return {
    controlState: controlState,
    reportState: reportState
  };
}

class Info extends Component {
  getData(value, data){
    if(value.hasOwnProperty('number')){
      return +Number(data).toFixed(2);
    }
    return data;
  }
  render() {
    let value = this.props.value;
    let reportState = this.props.reportState;
    let controlState = this.props.controlState;
    let time = new Date(reportState.timestamp);
    return (
      <View style={styles.info}>
        <Text style={styles.infoName}>{value.name}</Text>
        <Text>Date: {time.toLocaleDateString()}</Text>
        <Text>Time: {time.toLocaleTimeString()}</Text>
        <Text>Report: {this.getData(value, reportState.data)}</Text>
        {controlState && <Text>Control: {this.getData(value, controlState.data)}</Text>}
        {
          value.number &&
          <Fragment>
            <Text>Unit: {value.number.unit}</Text>
            <Text>Min: {value.number.min}</Text>
            <Text>Max: {value.number.max}</Text>
            <Text>Step: {value.number.step}</Text>
          </Fragment>
        }
      </View>
    );
  }
}

export default connect(mapStateToProps)(Info);
