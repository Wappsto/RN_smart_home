import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Screen from '../components/Screen';
import Value from '../components/Value';
import RequestError from '../components/RequestError';

import * as request from 'wappsto-redux/actions/request';
import * as stream from 'wappsto-redux/actions/stream';

import { getEntity, getEntities } from 'wappsto-redux/selectors/entities';
import { getRequest } from 'wappsto-redux/selectors/request';

import networkData from '../networkData';
const networkName = networkData.name;
const map = networkData.devices;

function getValues(cache, state, network){
  if(network){
    let nDevices = getEntities(state, 'device', { parent: network.meta });
    for(let key in map){
      cache[key] = [];
      let device = nDevices.find((d) => d.name === key);
      if(device){
        let values = getEntities(state, 'value', { parent: device.meta });
        map[key].forEach((name) => {
          let value =  values.find((v) => v.name === name);
          if(value){
            cache[key].push(value);
          }
        });
      }
    }
  } else {
    for(let key in map){
      cache[key] = [];
      map[key].forEach((name) => {
        cache[key].push({});
      });
    }
  }
  return cache;
}

function mapStateToProps(state, componentProps){
  let values = {};
  let network = getEntity(state, 'network', {
    filter: {
      name: networkName
    }
  });
  getValues(values, state, network);
  return {
    request: getRequest(state, '/network', 'GET'),
    network: network,
    values: values
  };
}

function mapDispatchToProps(dispatch){
  return {
    ...bindActionCreators({...request, ...stream}, dispatch)
  }
}

class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      info: false
    }
    this.toggleInfo = this.toggleInfo.bind(this);
    this.pullUpdate = this.pullUpdate.bind(this);
  }
  componentDidMount(){
    this.props.makeRequest('GET', '/network', null, {
      query: {
        this_name: [networkName],
        expand: 5
      }
    });
  }
  initStream(network){
    if(network && !this.streamStarted){
      this.streamStarted = true;
      this.props.initializeStream({ name: 'smart-home-phone-app', subscription: ["/network/" + network.meta.id]});
    }
  }
  toggleInfo(){
    this.setState((state, props) => {
      return {
        info: !state.info
      }
    });
  }
  pullUpdate(){
    this.props.makeRequest('PATCH', '/value', { status: 'update' });
  }
  render() {
    let info = this.state.info;
    let request = this.props.request;
    let values = this.props.values;
    let network = this.props.network;
    this.initStream(network);
    return (
      <Screen>
        <ScrollView>
          <View style={styles.container}>
            <View style={[styles.row]}>
              <TouchableOpacity style={styles.button} onPress={this.toggleInfo}>
                <Icon name='info-circle' size={25} color='grey' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.pullUpdate}>
                <Icon name='sync-alt' size={25} color='grey' />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Smart Home</Text>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sensors</Text>
              <FlatList
                extraData={info}
                keyExtractor={(item, index) => (item.meta && item.meta.id) || index + ''}
                data={values.Sensors}
                renderItem={({item}) => <Value type="sensor" info={info} request={request} value={item}/>}
                numColumns={2}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>LED</Text>
              <FlatList
                extraData={info}
                keyExtractor={(item, index) => (item.meta && item.meta.id) || index + ''}
                data={values.LED}
                renderItem={({item}) => <Value type="led" info={info} request={request} value={item}/>}
              />
            </View>
          </View>
          <RequestError error={request} />
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 15,
    marginLeft: 20,
    alignSelf: 'flex-start'
  }
});

export { map };
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
