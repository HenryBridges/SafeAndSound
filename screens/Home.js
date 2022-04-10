import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import RoundButton from '../components/Buttons/roundButtons';
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import gc from '../general/globalColors';
import ReportModal from './ReportModal';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapDarkStyle } from './mapData';
import { TextInput } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  const [showReport, setShowReport] = useState(false);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          customMapStyle={mapDarkStyle}
          region={{
            latitude: 53.40337920431939,
            longitude: -2.9800671712865228,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <Marker
            coordinate={{
              latitude: 53.40337920431939,
              longitude: -2.9800671712865228
            }}
            image={require('../assets/images/redMark1.png')}
            title='SOHO'
            description='Safety Level: Dangerous'
          />

          <Marker
            coordinate={{
              latitude: 53.40170704874639,
              longitude: -2.978476676066523
            }}
            image={require('../assets/images/orangeMark.png')}
            title='Brooklyn Mixer'
            description='Safety Level: Medium'
          />

          <Marker
            coordinate={{
              latitude: 53.40299911902814,
              longitude: -2.9814141739698314
            }}
            image={require('../assets/images/greenMark.png')}
            title='Bar 54'
            description='Safety Level: Safe'
          />
        </MapView>

        <View style={styles.searchBox}>
          <TextInput
            placeholder='Search here'
            placeholderTextColor='#000'
            autoCapitalize='none'
            style={{ flex: 1, padding: 0 }}
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
              text={'REPORT'}
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
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
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
