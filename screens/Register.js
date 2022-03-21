import React from 'react';
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Register = ({ navigation }) => {
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
            text='DOB ddmmyy'
            wProportion={0.8}
            hProportion={0.12}
          />
          <OurTextInput text='Surname' wProportion={0.8} hProportion={0.12} />
        </View>
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
    alignSelf: 'flex-start',
    top: 0.01 * height,
    left: 0.01 * width
  },
  formContainer: { top: 40, justifyContent: 'center', alignItems: 'center' }
});

export default Register;
