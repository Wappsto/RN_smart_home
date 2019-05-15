import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import store from './configureWappstoRedux';
import SlpashScreen from './views/SplashScreen';
import LoginScreen from './views/LoginScreen';
import MainScreen from './views/MainScreen';

const SwitchNavigator = createSwitchNavigator({
  SplashScreen: { screen: SlpashScreen },
  LoginScreen: { screen: LoginScreen },
  MainScreen: { screen: MainScreen }
});

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}
