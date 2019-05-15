import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../../styles/led';

export default class LEDPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.controlState.data
    }
    this.update = this.update.bind(this);
  }
  update(){
    this.props.makeRequest('PATCH', '/state/' + this.props.controlState.meta.id, { data: this.state.data });
  }
  render(){
    let updateRequest = this.props.updateRequest;
    let disabled = updateRequest && updateRequest.status === 'pending';
    return(
      <Fragment>
        <TextInput
          style={[styles.input, styles.box]}
          onChangeText={(data) => this.setState({ data })}
          onSubmitEditing={this.update}
          value={this.state.data}
          editable={!disabled}
        />
        <TouchableOpacity
          style={[styles.button, styles.box]}
          onPress={this.update}>
          <Text style={[styles.centeredText, styles.buttonText]}>Set</Text>
        </TouchableOpacity>
      </Fragment>
    );
  }
}
