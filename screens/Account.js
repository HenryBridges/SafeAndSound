import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Alert } from 'react-native';
import Button from '../components/Buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OurModal from '../components/Other/OurModal';
import OurTextInput from '../components/Other/TextInput';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import gc from '../general/globalColors';
import { useNetInfo } from '@react-native-community/netinfo';
import { Keyboard } from 'react-native';
import { AuthContext } from '../components/Other/context';
import { useContext } from 'react';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Account = ({ navigation }) => {
  const netInfo = useNetInfo();

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
  const [deactivateMessage, setDeactivateMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const onDismissSnackBar = () => setSnackbarVisible(false);
  const { signOut } = useContext(AuthContext);

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
    if (newPassword == null) {
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
    if (confirmPassword == null) {
      valid = false
    }
    setConfirmPasswordError(!valid)
    setIsChangeLoading(valid);
    return valid;
  }

  const newPassHandle = () => {
    Keyboard.dismiss();
    setChangeSent(false);
    setIsChangeLoading(true);
    let validPassword = checkPassword();
    let validConfirmPassword = checkConfirmPassword();
    if (netInfo.isConnected) {
      if (validPassword && validConfirmPassword) {
        changePassword();
      } else {
        setIsChangeLoading(false);
      }
    } else {
      setChangeSent(true);
      setChangeResponse(false);
      setChangeMessage("No internet Connection");
      setIsChangeLoading(false);
    }
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
    let success = data["success"];
    let message = data["message"];
    setIsChangeLoading(false);
    setChangeSent(true);
    setChangeResponse(success);
    setChangeMessage(message);
    setTimeout(() => {
      setChangeSent(false);
      setShowModal(false);
    }, 3000)
  }


  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@jwt');
      await AsyncStorage.removeItem('@user');
      signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const deactivateAccountAlert = () => {
    Alert.alert(
      "Deactivate Account",
      "Are you sure you want to deactivate the account?",
      [
        {
          text: "No",
          onPress: () => console.log("Not Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => { deactivateAccountHandle() }
        }
      ]
    );
  };

  const deactivateAccount = () => {
    fetch('https://safe-sound-208.herokuapp.com/user/deactivate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`
      },
    })
      .then((response) => response.json())
      .then((data) => handleResponseDeactivate(data))
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleResponseDeactivate = (data) => {
    let success = data["success"];
    let message = data["message"];
    setSnackbarVisible(true);
    setDeactivateMessage(message);
    if (success) {
      setTimeout(() => {
        logout();
      }, 3000)
    }
  }
  const deactivateAccountHandle = () => {
    if (netInfo.isConnected) {
      deactivateAccount();
    } else {
      setSnackbarVisible(true);
      setDeactivateMessage("No internet connection")
    }
  };

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
        <Snackbar
          duration={5000}
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          wrapperStyle={
            { bottom: 0.02 * height }
          }
          style={{
            backgroundColor: gc.colors.errorLightRed,
            borderColor: gc.colors.errorRed,
            borderWidth: 2,
            borderRadius: 6
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: gc.colors.errorRed
            }}>
            {deactivateMessage}
          </Text>
        </Snackbar>
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
                    backgroundColor: changeResponse
                      ? gc.colors.successLightGreen
                      : gc.colors.errorLightRed,
                    borderColor: changeResponse
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
                      color: changeResponse
                        ? gc.colors.successGreen
                        : gc.colors.errorRed,
                      fontWeight: '600',
                      textAlign: 'center'
                    }}
                  >
                    {changeMessage}
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
          <View style={styles.detailsStyle}>
            <Text>Email: </Text>
            <Text style={{ color: gc.colors.lightPeriwinkle }}>
              {userObj.user_email}
            </Text>
          </View>
          <View style={styles.detailsStyle}>
            <Text>Phone: </Text>
            <Text style={{ color: gc.colors.lightPeriwinkle }}>
              {userObj.user_phone}
            </Text>
          </View>
          <View style={styles.detailsStyle}>
            <Text>NHS Number: </Text>
            <Text style={{ color: gc.colors.lightPeriwinkle }}>
              {userObj.nhs_number}
            </Text>
          </View>
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
            onPress={deactivateAccountAlert}
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
    flexDirection: 'row',
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
