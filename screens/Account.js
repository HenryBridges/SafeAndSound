import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo'

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ alignSelf: 'center' }}>Account Screen</Text>
      <Button
        type={'Primary'}
        text={'Go Back'}
        onPress={() => navigation.goBack()}
        wProportion={0.6}
        hProportion={0.12}
        topSpace={5}
      />
    </View>
  );
};

export default Account;
