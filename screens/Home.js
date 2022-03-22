import React from 'react';
import Button from '../components/Buttons/Button';
import RoundButton from '../components/Buttons/roundButtons';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Fragment,
  SafeAreaView
} from 'react-native';
import { backArrow } from '../assets/images/images';
import { StackActions } from '@react-navigation/native';
import gc from '../general/globalColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.backBtn}>
          <RoundButton
            type='primary'
            icon={backArrow}
            onPress={() => navigation.goBack()}
            wProportion={0.1}
            hProportion={0.1}
            background={true}
          />
        </View>
        <View style={styles.reportBtn}>
          <Button
            type={'primary'}
            text={'Report'}
            onPress={() => {
              navigation.navigate('Report');
            }}
            hProportion={0.1}
            wProportion={0.75}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ''
  },
  reportBtn: {
    marginTop: 0.84 * height,
    bottom: 0.05 * height,
    alignItems: 'center',
    width: '100%'
  }
});

export default Home;
