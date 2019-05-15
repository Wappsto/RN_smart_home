import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

export default class RequestError extends Component {
  render() {
    let error = this.props.error;
    if(error && error.status === "error"){
      return (<Text style={styles.error}> {(error.json && error.json.message) || error.errorStatus} </Text>);
    }
    return null;
  }
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: 'red'
  },
});
