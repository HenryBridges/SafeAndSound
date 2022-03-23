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
            icon={'backArrow'}
            onPress={() => navigation.goBack()}
            wProportion={0.1}
            hProportion={0.1}
            background={true}
          />
        </View>
        <View style={styles.floatingButtonsContainer}>
          <View>
            <RoundButton
              icon={'menuIcon'}
              onPress={() => navigation.goBack()}
              wProportion={0.1}
              hProportion={0.1}
              background={true}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0
            }}
          >
            <RoundButton
              icon={'chartIcon'}
              onPress={() => navigation.goBack()}
              wProportion={0.1}
              hProportion={0.1}
              background={true}
            />
          </View>
        </View>
        <View style={styles.reportBtn}>
          <Button
            type={'primary'}
            text={'Report'}
            onPress={() => {
              navigation.navigate('Report');
            }}
            hProportion={0.1}
            wProportion={0.85}
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
    position: 'absolute',
    bottom: 0.035 * height,
    alignItems: 'center',
    width: '100%'
  },
  floatingButtonsContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end',
    bottom: 0.075 * height,
    flexDirection: 'row',
    width: 0.85 * width
  },
  backBtn: {
    left: 30
  }
});

export default Home;
