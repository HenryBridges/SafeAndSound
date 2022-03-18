import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { useState } from 'react';
import Button from '../components/Buttons/Button';
import UserLoginReq from '../models/User/UserLoginReq';
import gc from '../general/globalColors';
import OurTextInput from '../components/Other/TextInput';

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <OurTextInput
            style={styles.input}
            placeholder='Email:'
            placeholderTextColor='black'
            onChangeText={(email) => setUserEmail(email)}
            wProportion={0.8}
            hProportion={0.12}
          />
          <OurTextInput
            style={styles.input}
            placeholder='Password:'
            placeholderTextColor='black'
            onChangeText={(email) => setUserEmail(email)}
            wProportion={0.8}
            hProportion={0.12}
          />
          <Button
            type={'primary'}
            text={'Login'}
            onPress={() => navigation.navigate('Home')}
            wProportion={0.8}
            hProportion={0.1}
            topSpace={30}
          />
        </View>
        <View style={{ position: 'absolute', bottom: 20 }}>
          <Button
            type={'primary'}
            text={'To Home'}
            onPress={() => navigation.navigate('Home')}
            wProportion={0.8}
            hProportion={0.1}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.colors.white
  },
  inputContainer: {
    top: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10
  }
});

export default Login;
