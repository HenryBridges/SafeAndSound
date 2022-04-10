import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Button from '../components/Buttons/Button';

import gc from '../general/globalColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.log(height);
console.log(width);

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
      const user = JSON.parse(userObject)
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
      console.log(userObj)

    } catch (error) {
      console.log(error);
    }
  }

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
  }

  const validatePassword = () => {
    let valid = checkPassword();
    if (valid) {
      changePassword();
    }
  }

  const changePassword = () => {
    fetch('https://safe-sound-208.herokuapp.com/user/password/change', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
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
  }

  const handleResponses = () => {

  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: gc.colors.white, flexDirection: 'column' }}>

      <Text style={styles.largeTitle} >Account </Text>
      <Text style={styles.subTitle} >Details </Text>

      <View style={styles.detailsWrapper}>
        <Text style={styles.detailsStyle}>Email: </Text>
        <Text style={styles.detailsStyle}>Signed up using: </Text>
        <Text style={styles.detailsStyle}>Email verified: </Text>
      </View>

      <Button
        type={'Primary'}
        text={'Change Password'}
        onPress={() => navigation.goBack()}
        wProportion={0.6}
        hProportion={0.12}
        topSpace={40}
        style={{ alignSelf: 'center' }}
      />

      <View style={styles.deleteAccountWrapper}>
        <Text style={{
          fontSize: 0.034 * height,
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          left: 15,
          top: 10,
          color: gc.colors.periwinkle
        }}>Delete Your Account</Text>

        <Text style={{
          fontSize: 0.022 * height,
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          top: 20,
          left: 15,
          marginRight: 5,
          color: gc.colors.lightGrey
        }}>Click the button below to permentantly delete your account. This will
          remove your account and associated data from our system. This acction cannot be undone.
        </Text>

        <Button
          type={'Primary'}
          text={'Delete Account'}
          onPress={() => navigation.goBack()}
          wProportion={0.6}
          hProportion={0.12}
          topSpace={65}
          style={{}}
        />


      </View>

    </SafeAreaView>
  );

};

const styles = StyleSheet.create({


  detailsWrapper: {
    top: 30,
    alignItems: 'center'
  },
  deleteAccountWrapper: {
    backgroundColor: gc.colors.lightPink,
    marginTop: 40,
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
    marginTop: 10,
  },
  subTitle: {
    fontSize: 0.034 * height,
    fontWeight: 'bold',
    marginLeft: 4.5,
    color: gc.colors.periwinkle,
    left: 16,
    top: 15,
  },
  detailsStyle: {
    fontSize: 0.02 * height,
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: gc.colors.lightPink,
    borderRadius: 8,
    margin: 3.5,
    width: 0.9 * width,
    lineHeight: 0.025 * height,
    color: gc.colors.lightGrey
  }


});

export default Account;
