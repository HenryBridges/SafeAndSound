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
import { appIcon } from '../assets/images/images';
import OurModal from '../components/Other/OurModal';
import {
  resetPasswordGraphic,
  lostConnectionGraphic
} from '../assets/images/images';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/Other/context';
import { useContext } from 'react';


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
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const { signedIn } = useContext(AuthContext);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  //handles the logic for the forgot password path
  const forgotPassHandle = () => {
    setIsForgotLoading(true);
    setForgotSent(false);
    setForgotResponse(false);
    setForgotMessage('');
    setForgotEmailValid(false);
    let valid = validateForgot();
    if (valid) {
      forgot();
    } else {
      setIsForgotLoading(false);
    }
  };

  //validates the forgot password
  const validateForgot = () => {
    let valid = true;
    if (forgotEmail == '') {
      valid = false;
      setForgotEmailValid(true);
    }
    return valid;
  };

  //posts data to the api server and receives response
  const forgot = () => {
    fetch('https://safe-sound-208.herokuapp.com/user/password/recover', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_email: forgotEmail
      })
    })
      .then((response) => response.json())
      .then((data) => handleForgotResponses(data))
      .catch(function (error) {
        console.log(error);
      });
  }

  //handles the response of the api server
  const handleForgotResponses = (data) => {
    setIsForgotLoading(false);
    setForgotSent(true);
    if (data["success"]) {
      setForgotResponse(true);
    } else {
      setForgotResponse(false);
    }
    setForgotMessage(data["message"]);
    setTimeout(() => {
      setForgotSent(false);
    }, 5000)
  }

  //handle the logic of the login
  const submit = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    let valid = validateLogin();
    if (valid) {
      login();
    } else {
      setIsLoading(false);
    }
  };

  //validates the login form
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
        user_email: userEmail
      })
    })
      .then((response) => response.json())
      .then((data) => handleLogin(data))
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLogin = (data) => {
    let success = data["success"];
    let message = data["message"];
    let generic = data["generic"];
    if (!success) {
      setSnackbarVisible(true);
      setLoginMessage(message);
      setIsLoading(false);
    } else {
      saveData(message, generic);
      signedIn(message);
    }
  }

  const saveData = async (jwtToken, user) => {
    try {
      const userObject = JSON.stringify(user)
      await AsyncStorage.setItem('@user', userObject)
      await AsyncStorage.setItem('@jwt', jwtToken)
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: gc.colors.errorLightRed,
            borderColor: gc.colors.errorRed,
            borderWidth: 2,
            borderRadius: 6
          }}>
          <Text
            style={{
              color: gc.colors.errorRed
            }}>
            {loginMessage}
          </Text>
        </Snackbar>
        <View style={styles.graphicContainer}>
          <Image source={appIcon} />
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
          {isLoading ? <ActivityIndicator size='large' /> :
            <Button
              type={'primary'}
              text={'Login'}
              onPress={() => submit()}
              wProportion={0.8}
              hProportion={0.12}
              topSpace={10}
            />
          }
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={{ top: 20 }}>
              <Text>Don't have an account?</Text>
              <Text style={{ fontWeight: '600' }}> Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {showFPModal && (
          <OurModal style={{
            height: 0.4 * height,
            width: 0.6 * width,
            flex: 1
          }}
            visible={showFPModal}>
            <View style={{
              height: '80%',
              width: 0.6 * width
            }}>
              <Image
                source={resetPasswordGraphic}
                resizeMode='contain'
                style={{ flex: 1, height: null, width: null }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <OurTextInput
                  type={'primary'}
                  text='Enter Email'
                  onChangeText={(email) => setForgotEmail(email)}
                  wProportion={0.6}
                  hProportion={0.1}
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
                      top: 4,
                      borderRadius: 6
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
              </View>
              {isForgotLoading ? <ActivityIndicator size='small' style={{ marginTop: 10 }} /> : null}
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button
                  type={'secondary'}
                  text={'Back'}
                  onPress={() => {
                    setShowFPModal(!showFPModal);
                    setForgotSent(false);
                    setForgotEmail('');
                    setForgotEmailValid(false);
                  }}
                  wProportion={0.3}
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
