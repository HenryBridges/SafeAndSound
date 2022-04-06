import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Stats from '../screens/Stats';
import Report from '../screens/ReportModal';
import gc from '../general/globalColors';
import { Dimensions } from 'react-native';
import { openEye } from '../assets/images/images';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Drawer = createDrawerNavigator();

const AppDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      drawerActiveTintColor: gc.colors.white,
      drawerActiveBackgroundColor: gc.colors.periwinkle,
      drawerInactiveTintColor: gc.colors.lightPeriwinkle,
      drawerInactiveBackgroundColor: gc.colors.white,
      drawerStyle: {
        backgroundColor: gc.colors.white,
        width: 0.6 * width
      }
    }}
  >
    <Drawer.Screen name='Home' component={Home} />
    <Drawer.Screen
      name='Stats'
      component={Stats}
      options={{ title: 'Statistics' }}
    />
  </Drawer.Navigator>
);

export default AppDrawer;
