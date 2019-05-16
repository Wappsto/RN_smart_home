import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import store from '../../configureWappstoRedux';
import styles from '../../styles/led';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { getEntity } from 'wappsto-redux/selectors/entities';

import BindPanel from './BindPanel';

import networkData from '../../networkData';

export default class LEDPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.controlState.data,
      selected: -1
    }
    this.update = this.update.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  updateState(){
    this.update(this.state.data)
  }
  update(data){
    this.props.makeRequest('PATCH', '/state/' + this.props.controlState.meta.id, { data });
  }
  bindPanel(value){
    if(this.state.selected === value){
      value = -1;
    }
    this.setState({ selected: value });
  }
  getIconName(index){
    let value = networkData.devices.Sensors[index];
    return networkData.data[value].icon;
  }
  render(){
    let updateRequest = this.props.updateRequest;
    let disabled = updateRequest && updateRequest.status === 'pending';
    let selected = this.state.selected;
    return(
      <Fragment>
        <TextInput
          style={[styles.input, styles.box]}
          onChangeText={(data) => this.setState({ data })}
          onSubmitEditing={this.updateState}
          value={this.state.data}
          editable={!disabled}
        />
        <TouchableOpacity style={[styles.box, styles.button]} onPress={this.updateState}>
          <Text style={[styles.centeredText, styles.buttonText]}>Set</Text>
        </TouchableOpacity>
        <View style={[styles.row, styles.footer, styles.icons]}>
          <TouchableOpacity onPress={() => {this.bindPanel(0)}}>
            <Icon name={this.getIconName(0)} size={35} color={selected === 0 ? 'cyan' : 'grey'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.bindPanel(1)}}>
            <Icon name={this.getIconName(1)} size={35} color={selected === 1 ? 'cyan' : 'grey'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.bindPanel(2)}}>
            <Icon name={this.getIconName(2)} size={35} color={selected === 2 ? 'cyan' : 'grey'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.bindPanel(3)}}>
            <Icon name={this.getIconName(3)} size={35} color={selected === 3 ? 'cyan' : 'grey'} />
          </TouchableOpacity>
        </View>
        <BindPanel selected={this.state.selected} makeRequest={this.props.makeRequest} update={this.update}/>
      </Fragment>
    );
  }
}
