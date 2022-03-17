import React from 'react';
import { Text, View, Dimensions, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import Button from '../components/Buttons/Button';
import UserLoginReq from '../models/User/UserLoginReq';

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Email:'
          placeholderTextColor='black'
          onChangeText={(email) => setUserEmail(email)}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2f2'
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 10
  }
});

export default Login;
