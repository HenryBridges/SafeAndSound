import React from 'react';
import { View, Text, SafeAreaView, Dimensions, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import Button from '../Buttons/Button';
import { useContext } from 'react';
import { AuthContext } from './context';
import gc from '../../general/globalColors';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appIcon } from '../../assets/images/images';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CustomDrawer = (props) => {
  const { signOut } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  //get user saved on the phone storage
  //add it to the state
  const getUser = async () => {
    try {
      const userObject = await AsyncStorage.getItem('@user');
      const user = JSON.parse(userObject);
      setUsername(user['name'] + ' ' + user['surname']);
    } catch (error) {
      console.log(error);
    }
  };

  //delete the user and jwt token from phone storage to logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@jwt');
      await AsyncStorage.removeItem('@user');
      signOut();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View contentContainerStyle>
        <DrawerItemList {...props} />
      </View>
      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0.025 * height
        }}
      >
        <Button
          type='primary'
          text='Log Out'
          onPress={() => logout()}
          wProportion={0.5}
          hProportion={0.12}
          topSpace={0}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
