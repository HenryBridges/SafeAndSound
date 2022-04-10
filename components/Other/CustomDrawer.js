import React from 'react';
import { View, Text, SafeAreaView, Dimensions } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import Button from '../Buttons/Button';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView contentContainerStyle>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 0.023 * height
        }}
      >
        <Button
          type='primary'
          text='Log Out'
          onPress={() => console.log('Let me go to bed')}
          wProportion={0.5}
          hProportion={0.09}
          topSpace={0}
        />
      </View>
    </View>
  );
};

export default CustomDrawer;
