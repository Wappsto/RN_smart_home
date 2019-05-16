import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Color from 'color';

import styles from '../styles/led';

import RGB from './values/RGB';
import Brightness from './values/Brightness';
import LEDPanel from './values/LEDPanel';
import RequestError from './RequestError';
import Timestamp from './Timestamp';
import Info from './Info';

import { makeRequest } from 'wappsto-redux/actions/request';

import { getEntities } from 'wappsto-redux/selectors/entities';
import { getRequest } from 'wappsto-redux/selectors/request';

function mapStateToProps(state, componentProps){
  let value = componentProps.value;
  let controlState, reportState, updateRequest;
  if(value && value.meta){
    let states = getEntities(state, 'state', { parent: value.meta });
    controlState = states.find((s) => s.type === 'Control');
    reportState = states.find((s) => s.type === 'Report');
    updateRequest = getRequest(state, '/state/' + controlState.meta.id, 'PATCH');
  }
  return {
    controlState: controlState,
    reportState: reportState,
    updateRequest: updateRequest
  };
}

function mapDispatchToProps(dispatch){
  return {
    ...bindActionCreators({ makeRequest }, dispatch)
  }
}

class LEDValue extends Component {
  getItemView(value, controlState, updateRequest, reportState){
    let makeRequest = this.props.makeRequest;
    switch(value.name){
      case 'RGB':
        return {
          item: <RGB makeRequest={makeRequest} value={value} controlState={controlState}/>,
          report: <Icon name='circle' size={25} color={Color(Number(reportState.data)).hex()} />
        };
      case 'Brightness':
        return {
          item: <Brightness makeRequest={makeRequest} value={value} controlState={controlState}/>,
          report: <Text>{reportState.data}%</Text>
        };
      case 'LED Panel':
        return {
          item: <LEDPanel makeRequest={makeRequest} value={value} controlState={controlState} updateRequest={updateRequest}/>,
          report: null
        };
    }
    return {
      item: <Text>{controlState.data}</Text>,
      report: null
    };
  }
  render(){
    let value = this.props.value;
    let updateRequest = this.props.updateRequest;
    let controlState = this.props.controlState;
    let reportState = this.props.reportState;
    let view = this.getItemView(value, controlState, updateRequest, reportState);
    return (
      <Fragment>
        <View style={styles.header}>
          <Text style={styles.centeredText}>{value.name}</Text>
          {updateRequest && updateRequest.status === 'pending' && <ActivityIndicator size='small' color="cyan" style={{position: 'absolute', top: 0, right: 0}}/>}
        </View>
        <View style={styles.content}>
          {view.item}
        </View>
        <View style={[styles.row, styles.footer]}>
          {view.report}
          <Timestamp style={styles.timestamp} time={reportState.timestamp} />
        </View>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LEDValue);
