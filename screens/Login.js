import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import Button from '../components/Buttons/Button';

const Login = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2f2'
  }
});

export default Login;
