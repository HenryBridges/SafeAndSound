import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import RoundButton from '../components/Buttons/roundButtons';
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import gc from '../general/globalColors';
import ReportModal from './ReportModal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  const [showReport, setShowReport] = useState(false);

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
        <View style={styles.reportAndButtonsContainer}>
          <View style={styles.floatingButtonsContainer}>
            <View>
              <RoundButton
                icon={'menuIcon'}
                onPress={() => navigation.openDrawer()}
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
                onPress={() => navigation.navigate('Stats')}
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
                setShowReport(!showReport);
              }}
              hProportion={0.1}
              wProportion={0.85}
            />
          </View>
        </View>
        {showReport && <ReportModal visible={true} topSpace={0} />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: gc.colors.white
  },
  reportAndButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 30,
    alignSelf: 'center'
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
    left: 25
  }
});

export default Home;
