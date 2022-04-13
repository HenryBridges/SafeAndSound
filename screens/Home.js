import React, { useState, useEffect } from 'react';
import Button from '../components/Buttons/Button';
import RoundButton from '../components/Buttons/roundButtons';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  Platform
} from 'react-native';
import gc from '../general/globalColors';
import ReportModal from './ReportModal';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapDarkStyle } from './mapData';
import { TextInput } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  const [showReport, setShowReport] = useState(false);
  const [currLocation, setCurrLocation] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.0025,
    longitudeDelta: 0.0025
  });

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) =>
        setCurrLocation({
          ...currLocation,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  });

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          customMapStyle={mapDarkStyle}
          region={currLocation}
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
        </MapView>

        <View style={styles.searchBox}>
          <TextInput />
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
