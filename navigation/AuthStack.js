import React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();
const AuthStack = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false,
    animation: 'slide_from_right',
    orientation: 'portrait_up'
  }}>
    <Stack.Screen component={Login} name='Login' />
    <Stack.Screen component={Register} name='Register' />
  </Stack.Navigator>
);

export default AuthStack;
