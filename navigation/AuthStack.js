import React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen component={Login} name='Login' />
    <Stack.Screen component={Register} name='Register' />
    <Stack.Screen component={Home} name='Home' />
  </Stack.Navigator>
);

export default AuthStack;
