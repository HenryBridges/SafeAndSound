import React, { useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Button from '../components/Buttons/Button';
import gc from '../general/globalColors';
import { signUp } from '../assets/images/images';
import OurTextInput from '../components/Other/TextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePickerModal from 'react-native-modal-datetime-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Register = ({ navigation }) => {
  //calendar dob picker------------------------------------------------------
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    minMaxAgeDates();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let setDate = date.toISOString().split('T')[0];
    setUserDOB(setDate);
    hideDatePicker();
  };

  //gender picker--------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Gender');
  const items = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNHS, setUserNHS] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userDOB, setUserDOB] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maxDate, setMaxDate] = useState(new Date());
  const [nameError, setNameError] = useState(false);
  const [userSurnameError, setSurnameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nhsNumError, setNhsNumError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [isRegistraionSucess, setItsRegistrationSucess] = useState(false);

  //validation---------------------------------------------------------------------
  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const isRequired = (value) => (value === '' ? false : true);

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isPhoneNumValid = (phoneNum) => {
    const re = new RegExp('^[+][0-9]{3}[0-9]{3}[0-9]{4,6}$');
    return re.test(phoneNum);
  };
  const isPasswordSecure = (password) => {
    const re = new RegExp(
      '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
    );
    return re.test(password);
  };

  const checkUserName = () => {
    let valid = true;
    const min = 3,
      max = 25;
    const username = userName;
    if (!isRequired(username)) {
      valid = false;
      setNameError(true);
    } else if (!isBetween(username.length, min, max)) {
      valid = false;
      setNameError(true);
    }
    return valid;
  };

  const checkUserSurname = () => {
    let valid = true;
    const min = 3,
      max = 25;
    const usersurname = userSurname;
    if (!isRequired(usersurname)) {
      valid = false;
      setSurnameError(true);
    } else if (!isBetween(usersurname.length, min, max)) {
      valid = false;
      setSurnameError(true);
    }
    return valid;
  };

  const checkEmail = () => {
    let valid = true;
    const email = userEmail;
    if (!isRequired(email)) {
      valid = false;
      setEmailError(true);
    } else if (!isEmailValid(email)) {
      valid = false;
      setEmailError(true);
    }
    return valid;
  };

  const checkPhoneNum = () => {
    let valid = true;
    const phoneNum = userPhone;
    if (!isRequired(phoneNum)) {
      valid = false;
      setPhoneError(true);
    } else if (!isPhoneNumValid(phoneNum)) {
      valid = false;
      setPhoneError(true);
    }
    return valid;
  };

  const checkNHS = () => {
    let valid = true;
    const min = 10,
      max = 10;
    if (!isRequired(userNHS)) {
      valid = false;
      setNhsNumError(true);
    } else if (!isBetween(userNHS.length, min, max)) {
      valid = false;
      setNhsNumError(true);
    }
    return valid;
  };

  const checkPassword = () => {
    let valid = true;
    const password = userPassword;
    if (!isRequired(password)) {
      valid = false;
      setPasswordError(true);
    } else if (!isPasswordSecure(password)) {
      valid = false;
      setPasswordError(true);
    }
    return valid;
  };

  const checkConfirmPassword = () => {
    let valid = true;
    // check confirm password
    const confirmPassword = userConfirmPassword;
    const password = userPassword;

    if (!isRequired(confirmPassword)) {
      valid = false;
      setConfirmPasswordError(true);
    } else if (password !== confirmPassword) {
      valid = false;
      setConfirmPasswordError(true);
    }
    return valid;
  };

  const checkGen = () => {
    let valid = true;
    if (userGender == '') {
      valid = false;
      setGenderError(false);
    }
    return valid;
  };

  const minMaxAgeDates = () => {
    let date = new Date();
    let year = date.getFullYear() - 18;
    let month = date.getMonth();
    let day = date.getDay();
    setMaxDate(new Date(year, month, day));
    console.log(maxDate);
  };

  const validateRegister = () => {
    let valid = false;
    let validUsername = checkUserName();
    let validuserSurname = checkUserSurname();
    let validEmail = checkEmail();
    let validNHSnum = checkNHS();
    let validPassword = checkPassword();
    let validConfirmPassword = checkConfirmPassword();
    let checkPhone = checkPhoneNum();
    let checkGender = checkGen();
    if (
      validUsername &&
      validuserSurname &&
      validEmail &&
      validNHSnum &&
      validPassword &&
      validConfirmPassword &&
      checkPhone &&
      checkGender
    ) {
      valid = true;
    }
    return valid;
  };

  const register = () => {
    fetch('https://safe-sound-208.herokuapp.com/user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        surname: userSurname,
        user_phone: userPhone,
        user_email: userEmail.toLowerCase(),
        dob: userDOB,
        nhs_number: userNHS,
        user_password: userConfirmPassword,
        gender: userGender
      })
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch(function (error) {
        console.log(error);
      });
  };

  const submit = () => {
    setSubmitting(true);
    setLoading(true);
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);
    setPhoneError(false);
    setGenderError(false);
    setNhsNumError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    let valid = validateRegister();
    if (valid) {
      register();
    } else {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.graphicContainer}>
            <Image source={signUp} />
          </View>
          <View style={styles.formContainer}>
            <OurTextInput
              text='First Name'
              wProportion={0.8}
              hProportion={0.1}
              onChangeText={(userName) => setUserName(userName)}
              error={nameError ? true : false}
            />
            <OurTextInput
              text='Surname'
              wProportion={0.8}
              hProportion={0.1}
              onChangeText={(userSurname) => setUserSurname(userSurname)}
              error={userSurnameError ? true : false}
            />
            <OurTextInput
              text='Email'
              wProportion={0.8}
              hProportion={0.1}
              onChangeText={(userEmail) => setUserEmail(userEmail)}
              error={emailError ? true : false}
              keyboardType='email-address'
            />
            <OurTextInput
              text='(+44) Phone Number'
              wProportion={0.8}
              hProportion={0.1}
              onChangeText={(userPhone) => setUserPhone(userPhone)}
              error={phoneError ? true : false}
              keyboardType='phone-pad'
            />
            <OurTextInput
              text='NHS Number'
              wProportion={0.8}
              hProportion={0.1}
              keyboardType='number-pad'
              onChangeText={(userNHS) => setUserNHS(userNHS)}
              error={nhsNumError ? true : false}
            />
            <OurTextInput
              text='Password'
              secure={true}
              wProportion={0.8}
              hProportion={0.1}
              onChangeText={(userPassword) => setUserPassword(userPassword)}
              error={passwordError ? true : false}
            />
            <OurTextInput
              text='Confirm Password'
              secure={true}
              wProportion={0.8}
              hProportion={0.1}
              onChangeText={(userConfirmPassword) =>
                setUserConfirmPassword(userConfirmPassword)
              }
              error={confirmPasswordError ? true : false}
            />
            <View
              style={{
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
                left: 0.11 * width,
                top: 5
              }}
            >
              <Text>Date Of Birth</Text>
            </View>
            <View>
              <Button
                type='primary'
                text='Choose Date'
                wProportion={0.8}
                hProportion={0.1}
                onPress={showDatePicker}
              />
              <DatePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={maxDate}
              />
            </View>
            <View
              style={{
                top: 15,
                width: 0.8 * width,
                zIndex: 9
              }}
            >
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                dropDownDirection='BOTTOM'
                textStyle={{
                  color: genderError ? gc.colors.errorRed : gc.colors.darkGrey,
                  fontWeight: '400',
                  fontSize: 0.02 * height
                }}
                style={{
                  backgroundColor: '#f6f6f6',
                  borderColor: genderError
                    ? gc.colors.errorRed
                    : gc.colors.darkGrey,
                  height: 0.05 * height
                }}
                containerStyle={{ backgroundColor: '#f6f6f6' }}
                onSelectItem={(item) => setUserGender(item.value)}
              />
            </View>
            {submitting ? null : (
              <Button
                type='primary'
                text='Sign Up'
                onPress={submit}
                wProportion={0.8}
                hProportion={0.1}
                topSpace={20}
              />
            )}

            <View style={styles.shadow}>
              <ActivityIndicator
                color={gc.colors.blue}
                size={'large'}
                animating={loading ? true : false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gc.colors.white
  },
  graphicContainer: {
    alignSelf: 'center'
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dobContainer: {},
  containerLoader: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
    top: 40
  }
});

export default Register;
