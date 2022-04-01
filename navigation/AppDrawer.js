import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Stats from '../screens/Stats';
import Report from '../screens/ReportModal';

const Drawer = createDrawerNavigator();

const AppDrawer = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name='Home' component={Home} />
    <Drawer.Screen name='Stats' component={Stats} />
  </Drawer.Navigator>
);

export default AppDrawer;
