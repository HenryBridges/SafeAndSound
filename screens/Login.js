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
  const [showFPModal, setShowFPModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailValid, setForgotEmailValid] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotResponse, setForgotResponse] = useState(false);

  const forgotPassHandle = () => {
    setForgotSent(false);
    setForgotResponse(false);
    setForgotMessage('');
    setForgotEmailValid(false);
    let valid = validateForgot();
    if (valid) {
      setForgotSent(true);
      setForgotResponse(true);
      setForgotMessage('Sent');
      setForgotEmailValid(false);
    }
  };

  const validateForgot = () => {
    let valid = true;
    if (forgotEmail == '') {
      valid = false;
      setForgotEmailValid(true);
    }
    return valid;
  };

  const validateLogin = () => {
    setEmailError(false);
    setPasswordError(false);
    let valid = true;
    if (userEmail === '') {
      valid = false;
      setEmailError(true);
    }
    if (userPassword === '') {
      valid = false;
      setPasswordError(true);
    }
    return valid;
  };

  const login = () => {
    fetch('https://safe-sound-208.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_password: userPassword,
        user_email: userEmail.toLowerCase()
      })
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch(function (error) {
        console.log(error);
      });
  };

  const submit = () => {
    let valid = validateLogin();
    if (valid) {
      login();
      //save jwt token and user in the user phone
      //got to home
    } else {
      //show error colours around input
    }
  };

  const saveData = (jwtToken, user) => {
    //save both things to phone
  };

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
            error={emailError ? true : false}
            keyboardType='email-address'
          />
          <OurTextInput
            text='Password'
            onChangeText={(txt) => setUserPassword(txt)}
            wProportion={0.8}
            hProportion={0.12}
            secure={true}
            error={passwordError ? true : false}
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
          <OurModal visible={showFPModal} topSpace={-0.15 * height}>
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
              onChangeText={(email) => setForgotEmail(email)}
              wProportion={0.6}
              hProportion={0.09}
              error={forgotEmailValid}
              keyboardType='email-address'
            />
            {forgotSent && (
              <View
                style={{
                  backgroundColor: forgotResponse
                    ? gc.colors.successLightGreen
                    : gc.colors.errorLightRed,
                  borderColor: forgotResponse
                    ? gc.colors.successGreen
                    : gc.colors.errorRed,
                  borderWidth: 2,
                  padding: 5,
                  width: 0.6 * width,
                  top: 4
                }}
              >
                <Text
                  style={{
                    color: forgotResponse
                      ? gc.colors.successGreen
                      : gc.colors.errorRed,
                    fontWeight: '600',
                    textAlign: 'center'
                  }}
                >
                  {forgotMessage}
                </Text>
              </View>
            )}
            <View style={{ flexDirection: 'row' }}>
              <Button
                type={'secondary'}
                text={'Back'}
                onPress={() => {
                  setShowFPModal(!showFPModal);
                  setForgotSent(false);
                  setForgotEmail('');
                  setForgotEmailValid(false);
                }}
                wProportion={0.25}
                hProportion={0.09}
                topSpace={5}
              />
              <Button
                type={'primary'}
                text={'Submit'}
                onPress={(email) => forgotPassHandle(email)}
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
    top: 0.01 * height
  }
});

export default Login;
