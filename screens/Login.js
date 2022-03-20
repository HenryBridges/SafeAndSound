import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView
} from 'react-native';
import { useState } from 'react';
import Button from '../components/Buttons/Button';
import UserLoginReq from '../models/User/UserLoginReq';
import gc from '../general/globalColors';
import OurTextInput from '../components/Other/TextInput';
import { loginGraphic } from '../assets/images/images';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isSecure, setIsSecure] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.graphicContainer}>
          <Image source={loginGraphic} />
        </View>
        <View style={styles.inputContainer}>
          <OurTextInput
            text='Email'
            onChangeText={(email) => setUserEmail(email)}
            wProportion={0.8}
            hProportion={0.14}
          />
          <OurTextInput
            text='Password'
            onChangeText={(email) => setUserEmail(email)}
            wProportion={0.8}
            hProportion={0.14}
            secure={true}
          />
          <Button
            type={'primary'}
            text={'Login'}
            onPress={() => navigation.navigate('Home')}
            wProportion={0.8}
            hProportion={0.1}
            topSpace={40}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.colors.white
  },
  inputContainer: {
    top: 0.355 * height,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20
  },
  graphicContainer: {
    alignSelf: 'center',
    top: 0.095 * height
  }
});

export default Login;
