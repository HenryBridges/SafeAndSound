import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Stats from './screens/Stats';
import Report from './screens/Report';
import Login from './screens/Login';
import Register from './screens/Register';

const hasLoggedIn = false;

const AuthStack = createNativeStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen component={Login} name='Login' />
    <AuthStack.Screen component={Register} name='Register' />
    <AuthStack.Screen
      component={Home}
      name='Home'
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const AppStack = createNativeStackNavigator();
const AppStackScreens = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      component={Home}
      name='Home'
      options={{ headerShown: false }}
    />
    <AppStack.Screen
      component={Stats}
      name='Stats'
      options={{ headerShown: true }}
    />
    <AppStack.Screen
      component={Report}
      name='Report'
      options={{ headerShown: false, presentation: 'modal' }}
    />
  </AppStack.Navigator>
);

export default () => (
  <NavigationContainer>
    {hasLoggedIn ? <AppStackScreens /> : <AuthStackScreens />}
  </NavigationContainer>
);
