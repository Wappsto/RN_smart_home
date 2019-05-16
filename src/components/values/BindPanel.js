import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEntity } from 'wappsto-redux/selectors/entities';

import networkData from '../../networkData';

function mapStateToProps(state, componentProps){
  let reportState;
  let selected = componentProps.selected;
  if(selected >= 0){
    let name = networkData.devices.Sensors[selected];
    let value = getEntity(state, 'value', {
      filter: {
        name: name
      }
    });
    reportState = getEntity(state, 'state', {
      parent: value.meta,
      filter: {
        type: 'Report'
      }
    });
  }
  return {
    reportState: reportState
  };
}

class BindPanel extends Component {
  componentDidUpdate(){
    let reportState = this.props.reportState;
    if(reportState && reportState.data !== this.previousData){
      this.previousData = reportState.data;
      let name = networkData.devices.Sensors[this.props.selected];
      this.props.update(reportState.data + " " + networkData.data[name].unit);
    }
  }
  render() {
    return null;
  }
}

export default connect(mapStateToProps)(BindPanel);
