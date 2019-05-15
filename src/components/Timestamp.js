import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';

import TimestampComponent from 'wappsto-components/Timestamp';

export default class Timestamp extends TimestampComponent {
  render() {
    return (
      <Text style={this.props.style}>{this.fromNow(this.props.time)}</Text>
    );
  }
}
