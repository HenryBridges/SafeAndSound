import React, { useState, useRef } from 'react';
import Button from '../components/Buttons/Button';
import RoundButton from '../components/Buttons/roundButtons';
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import gc from '../general/globalColors';
import OurModal from '../components/Other/OurModal';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import { mapStyle } from './mapData';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Home = ({ navigation }) => {
<<<<<<< Updated upstream
  const ws = useRef(null);
  const netInfo = useNetInfo();
  const [showReport, setShowReport] = useState(false);
  const initialState = {
=======
  // Report Modal UseStates
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentValue, setIncidentValue] = useState('');
  const [showReport, setShowReport] = useState(false);

  // Map/Location UseStates
  const [currLocation, setCurrLocation] = useState({
>>>>>>> Stashed changes
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  }
  const [currentPosition, setCurrentPosition] = useState(initialState)
  const [jwtToken, setJwtToken] = useState('');
  const [venues, setVenues] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const onDismissSnackBar = () => setSnackbarVisible(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentValue, setIncidentValue] = useState(0);
  const [incidentItems, setIncidentItems] = useState([]);
  const [venueOpen, setVenueOpen] = useState(false);
  const [venueValue, setVenueValue] = useState(0);
  const [details, setDetails] = useState('');
  const [venueSelected, setSelectedVenue] = useState(0);
  const [incidentSelected, setSelectedIncident] = useState(0);
  const socket = new WebSocket('wss://safe-sound-208.herokuapp.com/reports/add/user');

  const getCrimes = async () => {
    await getJwt()
      .then(jwt => {
        fetch("https://safe-sound-208.herokuapp.com/user/crimes", {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
          }
        })
          .then((result) => result.json())
          .then((data) => setIncidentItems(data["generic"]))
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getVenues = async () => {
    await getJwt()
      .then(jwt => {
        fetch("https://safe-sound-208.herokuapp.com/venues", {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
          }
        })
          .then((result) => result.json())
          .then((data) => setVenues(data["generic"]))
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getJwt = async () => {
    try {
      let jwt = await AsyncStorage.getItem("@jwt");
      setJwtToken(jwt);
      return jwt
    } catch (error) {
      console.log(error)
    }
  }

  const sendReport = () => {
    getUser().then(user => {
      let data = {
        report_date: new Date().toISOString().replace("Z", ""),
        report_details: details,
        report_user: user["user_id"],
        report_type: incidentSelected,
        report_venue: venueSelected
      }
      socket.send(JSON.stringify(data));
    })
    setDetails("");
    setIncidentValue("");
    setVenueValue("");
    setShowReport(false);
  }

  const getUser = async () => {
    try {
      let obj = await AsyncStorage.getItem("@user");
      let user = JSON.parse(obj)
      return user;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setCurrentPosition({
        ...currentPosition,
        latitude,
        longitude
      })
    },
      error => {
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    getVenues();
    getCrimes();
    socket.onmessage = (e) => {
      console.log(e);
    };
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Snackbar
          duration={3000}
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          wrapperStyle={
            { bottom: 0.02 * height }
          }
          style={{
            backgroundColor: gc.colors.errorLightRed,
            borderColor: gc.colors.errorRed,
            borderWidth: 2,
            borderRadius: 6,
            zIndex: 10
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: gc.colors.errorRed
            }}>
            No internet connection, please connect and reload app.
          </Text>
        </Snackbar>
        <MapView
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={currentPosition}
          customMapStyle={mapStyle}
          userLocationPriority='high'
          followsUserLocation={true}
          userLocationUpdateInterval={500}
          userLocationFastestInterval={500}
        >
          {venues !== [] ? venues.map((venue) => {
            return (
              <Marker
                key={venue["venue_id"]}
                coordinate={{
                  latitude: venue["venue_lat"],
                  longitude: venue["venue_long"]
                }}
                image={require('../assets/images/redMark1.png')}
                title={venue["venue_name"]}
                tracksViewChanges={false}
                onCalloutPress={() => console.log("go to")}
              />
            )
          }) : null}
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
              text={'Report'}
              onPress={() => {
                setShowReport(!showReport);
              }}
              hProportion={0.1}
              wProportion={0.85}
            />
          </View>
        </View>
<<<<<<< Updated upstream
        {showReport && <OurModal>
=======
        {showReport && (
>>>>>>> Stashed changes
          <View style={styles.formContainer}>
            <View style={{ padding: 10, zIndex: 1000 }}>
              <DropDownPicker
                placeholder='Type of Incident'
                open={incidentOpen}
                value={incidentValue}
<<<<<<< Updated upstream
                items={incidentItems.map(crime => ({ label: crime["crime_name"], value: crime["crime_id"] }))}
=======
                items={incidentItems}
>>>>>>> Stashed changes
                setOpen={setIncidentOpen}
                setValue={setIncidentValue}
                dropDownDirection='BOTTOM'
                zIndex={1000}
                style={{
                  backgroundColor: '#f6f6f6',
                  borderColor: gc.colors.darkGrey,
                  height: 0.05 * height,
                  width: 0.65 * width
                }}
                containerStyle={{
                  backgroundColor: '#f6f6f6',
                  width: 0.65 * width
                }}
<<<<<<< Updated upstream
                onSelectItem={(item) => setSelectedIncident(item.value)}
              />
            </View>
            <View style={{ padding: 10, zIndex: 10 }}>
              <DropDownPicker
                placeholder='Venue'
                open={venueOpen}
                items={venues.map(venue => ({ label: venue["venue_name"] + " - " + venue["venue_city"], value: venue["venue_id"] }))}
                value={venueValue}
=======
                onSelectItem={(item) => console.log(item.value)}
              />
            </View>
            <View style={{ padding: 10 }}>
              <DropDownPicker
                placeholder='Venue'
                open={venueOpen}
                value={venueValue}
                items={venues}
>>>>>>> Stashed changes
                setOpen={setVenueOpen}
                setValue={setVenueValue}
                dropDownDirection='BOTTOM'
                zIndex={800}
                style={{
<<<<<<< Updated upstream
                  zIndex: 10,
=======
>>>>>>> Stashed changes
                  backgroundColor: '#f6f6f6',
                  borderColor: gc.colors.darkGrey,
                  height: 0.05 * height,
                  width: 0.65 * width
                }}
                containerStyle={{
                  backgroundColor: '#f6f6f6',
                  width: 0.65 * width
                }}
<<<<<<< Updated upstream
                onSelectItem={(item) => setSelectedVenue(item.value)}
              />

            </View>
            <View style={{ padding: 10 }}>
              <TextInput
                style={{
                  maxHeight: 0.3 * height,
                  width: 0.65 * width
                }}
                mode='outlined'
                multiline={true}
                label="Details"
                value={details}
                onChangeText={details => setDetails(details)}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button
                type={'secondary'}
                text={'Back'}
                onPress={() => {
                  setIncidentValue('');
                  setVenueValue('');
                  setDetails('')
                  setShowReport(false)
                }}
                wProportion={0.3}
                hProportion={0.09}
                topSpace={5}
              />

              <Button
                type={'primary'}
                text={'Submit'}
                onPress={() => sendReport()}
                wProportion={0.3}
                hProportion={0.09}
                topSpace={5}
              />
            </View>


          </View>
        </OurModal>}
=======
                onSelectItem={(item) => console.log(item.value)}
              />
            </View>
          </View>
        )}
>>>>>>> Stashed changes
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
  },
  formContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

export default Home;
