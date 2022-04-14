import React from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/Other/CustomDrawer';
import Home from '../screens/Home';
import Stats from '../screens/Stats';
import Account from '../screens/Account';

import gc from '../general/globalColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Drawer = createDrawerNavigator();

const AppDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
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
    <Drawer.Screen
      name='Home'
      component={Home}
      options={{
        headerShown: false,
        drawerIcon: ({ color }) => (
          <Ionicons name='home-outline' size={22} color={color} />
        )
      }}
    />
    <Drawer.Screen
      name='Stats'
      component={Stats}
      options={{
        headerShown: true,
        headerTitle: 'Statistics',
        title: 'Statistics',
        drawerIcon: ({ color }) => (
          <Ionicons name='bar-chart-outline' size={22} color={color} />
        )
      }}
    />
    <Drawer.Screen
      name='Account'
      component={Account}
      options={{
        headerShown: true,
        headerTitle: 'Account',
        drawerIcon: ({ color }) => (
          <Ionicons name='person-outline' size={22} color={color} />
        )
      }}
    />
  </Drawer.Navigator>
);

export default AppDrawer;
