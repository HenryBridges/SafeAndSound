import React, { useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import Button from '../components/Buttons/Button';
import gc from '../general/globalColors';
import { signUp } from '../assets/images/images';
import OurTextInput from '../components/Other/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Register = ({ navigation }) => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);

  const onChooseDateHandle = (event, dob) => {
    setDateOfBirth(dob);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.graphicContainer}>
          <Image source={signUp} />
        </View>
        <View style={styles.formContainer}>
          <OurTextInput
            text='First Name'
            wProportion={0.8}
            hProportion={0.12}
          />
          <OurTextInput text='Surname' wProportion={0.8} hProportion={0.12} />
          <OurTextInput text='Email' wProportion={0.8} hProportion={0.12} />
          <OurTextInput
            text='NHS Number'
            wProportion={0.8}
            hProportion={0.12}
          />
          <OurTextInput
            text='Password'
            secure={true}
            wProportion={0.8}
            hProportion={0.12}
          />
          <OurTextInput
            text='Confirm Password'
            secure={true}
            wProportion={0.8}
            hProportion={0.12}
          />
        </View>
        {/* <View>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode={'date'}
              display={'default'}
              onChange={onChooseDateHandle}
            />
          )}
        </View> */}
      </ScrollView>
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
  formContainer: { top: 40, justifyContent: 'center', alignItems: 'center' }
});

export default Register;
