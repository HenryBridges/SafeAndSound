import React from 'react';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: gc.colors.white }}>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle} >Account </Text>
      </View>
      <View style={styles.subTitleWrapper}>
        <Text style={styles.subTitle} >Details </Text>
      </View>
      <View style={styles.detailsWrapper}>
        <Text style={styles.detailsStyle}>Email: </Text>
        <Text style={styles.detailsStyle}>Signed up using: </Text>
        <Text style={styles.detailsStyle}>Email verified: </Text>
      </View>


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
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({

  titleWrapper: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  subTitleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  detailsWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
    marginLeft: 4.5
  },
  reportAndButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 30,
    alignSelf: 'center'
  },
  largeTitle: {
    fontSize: 0.056 * height,
    fontWeight: 'bold',
    marginLeft: 4.5,
    color: gc.colors.periwinkle
  },
  subTitle: {
    fontSize: 0.034 * height,
    fontWeight: 'bold',
    marginLeft: 4.5,
    color: gc.colors.periwinkle
  },
  detailsStyle: {
    fontSize: 0.016 * height,
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: gc.colors.lightPink,
    borderRadius: 8,
    margin: 3.5,

  }


});

export default Account;
