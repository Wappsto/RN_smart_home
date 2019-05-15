import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  getItemView(value, controlState, updateRequest){
    let makeRequest = this.props.makeRequest;
    switch(value.name){
      case 'RGB':
        return <RGB makeRequest={makeRequest} value={value} controlState={controlState}/>;
      case 'Brightness':
        return <Brightness makeRequest={makeRequest} value={value} controlState={controlState}/>;
      case 'LED Panel':
        return <LEDPanel makeRequest={makeRequest} value={value} controlState={controlState} updateRequest={updateRequest}/>;
    }
    return <Text>{controlState.data}</Text>;
  }
  render(){
    let value = this.props.value;
    let updateRequest = this.props.updateRequest;
    let controlState = this.props.controlState;
    let reportState = this.props.reportState;
    return (
      <Fragment>
        <Text style={styles.centeredText}>{value.name}</Text>
        {updateRequest && updateRequest.status === 'pending' && <ActivityIndicator size='small' color="cyan" style={{position: 'absolute', top: 0, right: 0}}/>}
        <View style={styles.content}>
          {this.getItemView(value, controlState, updateRequest)}
        </View>
        <View style={[styles.row, styles.footer]}>
          {value.name !== 'LED Panel' && <Text>{reportState.data}</Text>}
          <Timestamp style={styles.timestamp} time={reportState.timestamp} />
        </View>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LEDValue);
