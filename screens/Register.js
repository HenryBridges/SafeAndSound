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
import DropDownPicker from 'react-native-dropdown-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Register = ({ navigation }) => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Gender');
  const items = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  const onChooseDateHandle = (event, dob) => {
    setDateOfBirth(dob);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.graphicContainer}>
          <Image source={signUp} />
        </View>
        <View style={styles.formContainer}>
          <OurTextInput
            text='First Name'
            wProportion={0.8}
            hProportion={0.09}
          />
          <OurTextInput text='Surname' wProportion={0.8} hProportion={0.09} />
          <OurTextInput text='Email' wProportion={0.8} hProportion={0.09} />
          <OurTextInput
            text='NHS Number'
            wProportion={0.8}
            hProportion={0.09}
          />
          <OurTextInput
            text='Password'
            secure={true}
            wProportion={0.8}
            hProportion={0.09}
          />
          <OurTextInput
            text='Confirm Password'
            secure={true}
            wProportion={0.8}
            hProportion={0.09}
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
          <View style={{ flexDirection: 'row' }}>
            <OurTextInput text='DD' wProportion={0.2} hProportion={0.08} />
            <OurTextInput text='MM' wProportion={0.2} hProportion={0.08} />
            <OurTextInput text='YYYY' wProportion={0.34} hProportion={0.08} />
          </View>
          <View
            style={{
              top: 15,
              width: 0.8 * width
            }}
          >
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              dropDownDirection='BOTTOM'
              style={{
                backgroundColor: '#f6f6f6',
                borderColor: gc.colors.darkGrey,
                height: 0.045 * height
              }}
              containerStyle={{ backgroundColor: '#f6f6f6' }}
              onSelectItem={(item) => console.log(item.value)}
            />
          </View>
        </View>
      </View>
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
  dobContainer: {}
});

export default Register;
