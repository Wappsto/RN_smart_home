import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  CheckBox,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';

import config from '../config.json';

import RequestError from '../components/RequestError';
import Screen from '../components/Screen';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { Login, connect } from 'wappsto-components/Login';

class LoginScreen extends Login {
  constructor(props){
    super(props);
    this.state = {
      ...this.state,
      username: '',
      password: ''
    }
    this.stream = config.stream;
  }
  saveSession(request){
    if(this.state.remember_me === true){
      AsyncStorage.setItem("session", JSON.stringify(request.json));
    }
  }
  navigateToMain(request){
    this.props.navigation.navigate('MainScreen');
  }
  render() {
    const postRequest = this.props.postRequest || this.fbSignInError ;
    const verifyRequest = this.props.verifyRequest;
    let request = postRequest || verifyRequest;
    return (
      <Screen style={{}}>
        <View style={{}}>
          <Text style={{}}>Email</Text>
          <TextInput
            style={{}}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            textContentType='emailAddress'
          />
          <Text style={{}}>Password</Text>
          <View>
            <TextInput
              style={{}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              textContentType='password'
              secureTextEntry={!this.state.showPassword}
            />
            <Icon
              style={{}}
              name={this.state.showPassword ? 'eye' : 'eye-slash'}
              onPress={this.toggleShowPassword}
              size={15}
            />
          </View>
          <TouchableOpacity
            style={[{}, (this.state.isSigninInProgress || (request && request.status === 'pending')) ? {} : null]}
            onPress={this.signIn}>
            <Text style={{}}>Log in</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType='none'
          transparent={true}
          visible={request && request.status === 'pending' ? true : false}>
          <View style={{}}>
            <ActivityIndicator size='large' color={{}} />
          </View>
        </Modal>
        <RequestError error={postRequest} />
      </Screen>
    );
  }
}

export default connect(LoginScreen);
