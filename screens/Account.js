import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Button from '../components/Buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [isChangeLoading, setIsChangeLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [changeResponse, setChangeResponse] = useState(false);
  const [changeMessage, setChangeMessage] = useState('');

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

  const checkPassword = () => {
    let valid = true;
    if (newPassword == '') {
      valid = false;
    } else if (!isPasswordSecure()) {
      valid = false;
    }
    return valid;
  };

  const validatePassword = () => {
    let valid = checkPassword();
    if (valid) {
      changePassword();
    }
  };

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
      .then((data) => handleForgotResponses(data))
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleResponses = () => {};

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
            onPress={() => navigation.goBack()}
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
            Delete Your Account
          </Text>

          <Text
            style={{
              fontSize: 0.022 * height,
              fontWeight: '400',
              alignSelf: 'flex-start',
              top: 20,
              textAlign: 'left',
              marginHorizontal: 15,
              color: gc.colors.lightPeriwinkle
            }}
          >
            Click the button below to permentantly delete your account. This
            will remove your account and associated data from our system. This
            action cannot be undone.
          </Text>

          <Button
            type={'primary'}
            text={'Delete Account'}
            onPress={() => navigation.goBack()}
            wProportion={0.8125}
            hProportion={0.12}
            topSpace={65}
            style={{}}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  detailsWrapper: {
    top: 30,
    alignItems: 'center'
  },
  deleteAccountWrapper: {
    backgroundColor: gc.colors.lightPink,
    marginTop: 60,
    height: 0.35 * height,
    width: 0.9 * width,
    borderRadius: 18,
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
    backgroundColor: gc.colors.lightPink,
    margin: 3.5,
    width: 0.9 * width,
    lineHeight: 0.025 * height,
    color: gc.colors.periwinkle
  }
});

export default Account;
