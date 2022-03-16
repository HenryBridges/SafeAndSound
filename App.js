import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Stats from './screens/Stats';
import Report from './screens/Report';

const AppStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AppNav = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default AppNav;
