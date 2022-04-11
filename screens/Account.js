import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Button from '../components/Buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OurModal from '../components/Other/OurModal';
import OurTextInput from '../components/Other/TextInput';
import { ActivityIndicator } from 'react-native-paper';
import gc from '../general/globalColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Account = ({ navigation }) => {
  const [userObj, setUser] = useState({
    user_id: 0,
    name: '',
    surname: '',
    user_phone: '',
    user_email: '',
    dob: '',
    nhs_number: '',
    gender: ''
  });
  const [jwtToken, setJwtToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangeLoading, setIsChangeLoading] = useState(false);
  const [changeResponse, setChangeResponse] = useState(false);
  const [changeMessage, setChangeMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [changeSent, setChangeSent] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('@jwt');
      setJwtToken(token);
      const userObject = await AsyncStorage.getItem('@user');
      const user = JSON.parse(userObject);
      setUser({
        ...userObj,
        user_id: user.user_id,
        name: user.name,
        surname: user.surname,
        user_phone: user.user_phone,
        user_email: user.user_email,
        dob: user.dob,
        nhs_number: user.nhs_number,
        gender: user.gender
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isPasswordSecure = () => {
    const re = new RegExp(
      '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
    );
    return re.test(newPassword);
  };


  const newPassHandle = () => {
    setIsChangeLoading(true);
    let validPassword = checkPassword();
    let validConfirmPassword = checkConfirmPassword();
    if (validPassword && validConfirmPassword) {
      changePassword();
    }

  }

  const checkPassword = () => {
    let valid = true;
    if (newPassword == '') {
      valid = false;
    }
    if (!isPasswordSecure()) {
      valid = false;
    }
    setPasswordError(!valid)
    setIsChangeLoading(valid);
    return valid;
  };

  const checkConfirmPassword = () => {
    let valid = true;
    if (newPassword != confirmPassword) {
      valid = false;
    }
    if (confirmPassword == '') {
      valid = false
    }
    setConfirmPasswordError(!valid)
    setIsChangeLoading(valid);
    return valid;
  }


  const changePassword = () => {
    fetch('https://safe-sound-208.herokuapp.com/user/password/change', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        user_password: newPassword
      })
    })
      .then((response) => response.json())
      .then((data) => handleResponses(data))
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleResponses = (data) => {

  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: gc.colors.white,
          flexDirection: 'column'
        }}
      >
        {showModal && (
          <OurModal
            style={{
              height: 0.4 * height,
              width: 0.6 * width,
              flex: 1
            }}
            visible={showModal}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <OurTextInput
                type={'primary'}
                text='New Password'
                onChangeText={(password) => setNewPassword(password)}
                wProportion={0.7}
                hProportion={0.12}
                secure={true}
                error={passwordError}
              />
              <OurTextInput
                type={'primary'}
                text='Confirm Password'
                onChangeText={(password) => setConfirmPassword(password)}
                wProportion={0.7}
                hProportion={0.12}
                secure={true}
                error={confirmPasswordError}
              />
              {changeSent && (
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
            {isChangeLoading ? <ActivityIndicator size='small' style={{ marginTop: 10 }} /> :
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button
                  type={'secondary'}
                  text={'Back'}
                  onPress={() => {
                    setShowModal(!showModal);
                  }}
                  wProportion={0.33}
                  hProportion={0.1}
                  topSpace={5}
                />

                <Button
                  type={'primary'}
                  text={'Submit'}
                  onPress={(newPassword) => newPassHandle(newPassword)}
                  wProportion={0.33}
                  hProportion={0.1}
                  topSpace={5}
                />
              </View>
            }
          </OurModal >
        )}
        <Text style={styles.largeTitle}>Account </Text>
        <Text style={styles.subTitle}>Details </Text>

        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsStyle}>
            <Text>Email: </Text>
            <Text style={{ color: gc.colors.lightPeriwinkle }}>
              {userObj.user_email}
            </Text>
          </Text>
          <Text style={styles.detailsStyle}>
            <Text>Phone: </Text>
            <Text style={{ color: gc.colors.lightPeriwinkle }}>
              {userObj.user_phone}
            </Text>
          </Text>
          <Text style={styles.detailsStyle}>
            <Text>NHS Number: </Text>
            <Text style={{ color: gc.colors.lightPeriwinkle }}>
              {userObj.nhs_number}
            </Text>
          </Text>
        </View>
        <View>
          <Button
            type={'primary'}
            text={'Change Password'}
            onPress={() => setShowModal(true)}
            wProportion={0.9}
            hProportion={0.12}
            topSpace={40}
            style={{ alignSelf: 'center' }}
          />
        </View>

        <View style={styles.deleteAccountWrapper}>
          <Text
            style={{
              fontSize: 0.034 * height,
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              left: 15,
              top: 10,
              color: gc.colors.periwinkle
            }}
          >
            Deactivate Your Account
          </Text>

          <Text
            style={{
              fontSize: 0.022 * height,
              fontWeight: '500',
              alignSelf: 'flex-start',
              top: 20,
              textAlign: 'left',
              marginHorizontal: 15,
              color: 'black'
            }}
          >
            Click the button below to permanently deactivate your account.
            This action cannot be undone.
          </Text>

          <Button
            type={'primary'}
            text={'Deactivate Account'}
            onPress={() => navigation.goBack()}
            wProportion={0.8125}
            hProportion={0.12}
            topSpace={100}
            backgroundColor={gc.colors.errorRed}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  detailsWrapper: {
    top: 30,
    alignItems: 'center',
  },
  deleteAccountWrapper: {
    backgroundColor: gc.colors.greyWhite,
    marginTop: 60,
    height: 0.35 * height,
    width: 0.9 * width,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center'
  },
  largeTitle: {
    fontSize: 0.056 * height,
    fontWeight: 'bold',
    marginLeft: 4.5,
    color: gc.colors.periwinkle,
    left: 16,
    marginTop: 10
  },
  subTitle: {
    fontSize: 0.034 * height,
    fontWeight: 'bold',
    marginLeft: 4.5,
    color: gc.colors.periwinkle,
    left: 16,
    top: 15
  },
  detailsStyle: {
    fontSize: 0.02 * height,
    fontWeight: '500',
    padding: 8,
    margin: 3.5,
    width: 0.9 * width,
    lineHeight: 0.025 * height,
    color: 'black',
    backgroundColor: gc.colors.greyWhite,
    borderRadius: 8
  }
});

export default Account;
