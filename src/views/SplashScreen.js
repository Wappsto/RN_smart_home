import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class SplashScreen extends Component {
  async checkSession(){
    try{
      let session = await AsyncStorage.getItem("session");
      if(session !== null){
        session = JSON.parse(session);
        this.session = session;
      }
      this.sessionRetrieved = true;
      if(this.timeoutEnded){
        this.props.navigation.navigate("LoginScreen", { session: session });
      }
    } catch(e){
      this.props.navigation.navigate("LoginScreen");
    }
  }
  componentDidMount(){
    this.checkSession();
    setTimeout(() => {
      this.timeoutEnded = true;
      if(this.sessionRetrieved){
        this.props.navigation.navigate("LoginScreen", { session: this.session });
      }
    }, 500);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Smart Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  }
});
