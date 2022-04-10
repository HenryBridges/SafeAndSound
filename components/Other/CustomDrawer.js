import React from 'react';
import { View, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView contentContainerStyle>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <Text>Log Out Button Here</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
