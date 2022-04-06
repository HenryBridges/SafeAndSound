import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import Button from '../components/Buttons/Button';
import gc from '../general/globalColors';
import OurTextInput from '../components/Other/TextInput';
import { loginGraphic } from '../assets/images/images';
import OurModal from '../components/Other/OurModal';
import {
  resetPasswordGraphic,
  lostConnectionGraphic
} from '../assets/images/images';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isSecure, setIsSecure] = useState(false);
  const [showFPModal, setShowFPModal] = useState(false);

  const validateLogin = () => {

  }

  const submit = () => {
    console.log({ userEmail })
    let valid = validateLogin();
    if (valid) {
      //save jwt token and user in the user phone 
      //got to home
    } else {
      //show error colours around input
    }
  }

  const saveData = (jwtToken, user) => {
    //save both things to phone 
  }


  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.graphicContainer}>
          <Image source={loginGraphic} />
        </View>
        <View style={styles.inputContainer}>
          <OurTextInput
            text='Email'
            onChangeText={(txt) => setUserEmail(txt)}
            wProportion={0.8}
            hProportion={0.12}
          />
          <OurTextInput
            text='Password'
            onChangeText={(txt) => setUserPassword(txt)}
            wProportion={0.8}
            hProportion={0.12}
            secure={true}
          />
          <TouchableOpacity
            style={styles.forgotPass}
            onPress={() => setShowFPModal(!showFPModal)} //In future add a render modal content to send email for reset password.
          >
            <Text style={{ textDecorationLine: 'underline' }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <Button
            type={'primary'}
            text={'Login'}
            onPress={() => submit()}
            wProportion={0.8}
            hProportion={0.12}
            topSpace={10}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')} //In future add a render modal content to send email for reset password.
          >
            <Text style={{ top: 20 }}>
              <Text>Don't have an account?</Text>
              <Text style={{ fontWeight: '600' }}> Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {showFPModal && (
          <OurModal visible={showFPModal} topSpace={0.118 * height}>
            <View
              style={{
                height: 0.25 * height,
                width: 0.6 * width
              }}
            >
              <Image
                source={resetPasswordGraphic}
                resizeMode='contain'
                style={{ flex: 1, height: null, width: null }}
              />
            </View>
            <OurTextInput
              type={'primary'}
              text='Enter Email'
              onChangeText={(item) => console.log(item)}
              wProportion={0.6}
              hProportion={0.09}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                type={'secondary'}
                text={'Back'}
                onPress={() => setShowFPModal(!showFPModal)}
                wProportion={0.25}
                hProportion={0.09}
                topSpace={5}
              />
              <Button
                type={'primary'}
                text={'Submit'}
                onPress={() => {
                  console.log('submitted');
                  setShowFPModal(!showFPModal);
                }}
                wProportion={0.3}
                hProportion={0.09}
                topSpace={5}
              />
            </View>
          </OurModal>
        )}
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
    top: 0.32 * height,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 0.072 * height,
    paddingHorizontal: 20
  },
  graphicContainer: {
    alignSelf: 'center',
    top: 0.08 * height
  },
  forgotPass: {
    left: 0.25 * width,
    top: 10
  }
});

export default Login;
