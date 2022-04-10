import React from 'react';
import { View, Text, SafeAreaView, Dimensions } from 'react-native';
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
      const user = JSON.parse(userObject)
      setUsername(user["name"] + " " + user["surname"])
    } catch (error) {
      console.log(error);
    }
  }

  //delete the user and jwt token from phone storage to logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@jwt');
      await AsyncStorage.removeItem('@user');
      signOut();
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '20%', backgroundColor: gc.colors.lightPeriwinkle }}>
        <Text>Welcome, {username}</Text>
      </View>
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
          onPress={() => logout()}
          wProportion={0.5}
          hProportion={0.09}
          topSpace={0}
        />
      </View>
    </View>
  );
};

export default CustomDrawer;
