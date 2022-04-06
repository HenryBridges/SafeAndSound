import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppDrawer from './navigation/AppDrawer';

const hasLoggedIn = false;

export default () => (
  <NavigationContainer>
    {hasLoggedIn ? <AppDrawer /> : <AuthStack />}
  </NavigationContainer>
);
