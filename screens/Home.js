import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import RoundButton from '../components/Buttons/roundButtons';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  PermissionsAndroid
} from 'react-native';
import gc from '../general/globalColors';
import OurModal from '../components/Other/OurModal';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import { mapStyle } from '../assets/mapData';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, Searchbar, List } from 'react-native-paper';

// Get height and width of window to dynamically style with.
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  // Use states for checking internet connection:
  const netInfo = useNetInfo();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const onDismissSnackBar = () => setSnackbarVisible(false);

  // Use states for reporting.
  const [showReport, setShowReport] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentValue, setIncidentValue] = useState(0);
  const [incidentItems, setIncidentItems] = useState([]);
  const [venueOpen, setVenueOpen] = useState(false);
  const [venueValue, setVenueValue] = useState(0);
  const [details, setDetails] = useState('');
  const [venueSelected, setSelectedVenue] = useState(0);
  const [incidentSelected, setSelectedIncident] = useState(0);
  const [venueError, setVenueError] = useState(false);
  const [incidentError, setIncidentError] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Use states for the map and user location
  const initialState = {
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002
  };
  const [currentPosition, setCurrentPosition] = useState(initialState);
  const [currentPositionBool, setCurrentPositionBool] = useState(false);

  // Use states for data and storing data fetched from API used for map and search bar.
  const [jwtToken, setJwtToken] = useState('');
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchReceived, setSearchReceived] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [severities, setSeverity] = useState(new Map());

  // Opens access for the socket connecting to web-app.
  const socket = new WebSocket(
    'wss://safe-sound-208.herokuapp.com/reports/add/user'
  );

  // Handle the aftermath of sending a message
  socket.onmessage = (e) => {
    let data = JSON.parse(e.data);
    if (data.success) {
      setReportSuccess(true);
      setReportMessage('Report Sent! Thank you for making this city safer!');
    } else {
      setReportSuccess(false);
      setReportMessage(data.message);
    }
    setSnackbarVisible(true);
  };

  // Fetches the list of possible crimes for incidents that can be reported.
  const getCrimes = (jwt) => {
    fetch('https://safe-sound-208.herokuapp.com/user/crimes', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((result) => result.json())
      .then((data) => {
        if (data['success']) {
          setIncidentItems(data['generic']);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Gets the list of venues from API.
  const getVenues = (jwt) => {
    fetch('https://safe-sound-208.herokuapp.com/venues', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((result) => result.json())
      .then((data) => {
        if (data['success']) {
          setVenues(data['generic']);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Update the maps markers with the severity for each venue.
  const updateMap = (k, v) => {
    setSeverity(new Map(severities.set(k, v)));
  };

  // Get the severity for each venue.
  const getSeverities = (jwt) => {
    fetch('https://safe-sound-208.herokuapp.com/venues/severity', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((result) => result.json())
      .then((data) => {
        if (data['success']) {
          let map = data['generic'];
          for (const [key, value] of Object.entries(map)) {
            let severity = value['average_severity'];
            updateMap(key, severity);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Allow the ability to search for a venue using the bar.
  const getVenuesBySearch = async (name) => {
    if (!netInfo.isConnected) {
      setReportMessage('No internet connection!');
      setReportSuccess(false);
      setSnackbarVisible(true);
    } else {
      if (name != '') {
        fetch(`https://safe-sound-208.herokuapp.com/venues/name/${name}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
          }
        })
          .then((result) => result.json())
          .then((data) => handleSearch(data))
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setSearchReceived(false);
        setSearchData([]);
      }
    }
  };

  // Handle the response for search bar.
  const handleSearch = (data) => {
    setSearchReceived(true);
    if (data['success']) {
      setSearchData(data['generic']);
    } else {
      setSearchData([]);
    }
  };

  // Fetch the JWT token from storage on device.
  const getJwt = async () => {
    try {
      let jwt = await AsyncStorage.getItem('@jwt');
      setJwtToken(jwt);
      getCrimes(jwt);
      getSeverities(jwt);
      getVenues(jwt);
    } catch (error) {
      console.log(error);
    }
  };

  // validation on the report and make sure each field is correct.
  const validateReport = () => {
    let valid = true;
    if (venueSelected === 0) {
      valid = false;
      setVenueError(true);
    }
    if (incidentSelected === 0) {
      valid = false;
      setIncidentError(true);
    }
    return valid;
  };

  // Send report along the web-socket to web-app.
  const sendReport = async () => {
    if (!netInfo.isConnected) {
      setReportMessage('No internet connection!');
      setReportSuccess(false);
      setSnackbarVisible(true);
    } else {
      let valid = validateReport();
      if (valid) {
        await getUser()
          .then((user) => {
            let data = {
              report_date: new Date().toISOString().replace('Z', ''),
              report_details: details,
              report_user: user['user_id'],
              report_type: incidentSelected,
              report_venue: venueSelected
            };
            socket.send(JSON.stringify(data));
          })
          .catch(function (error) {
            console.log(error);
          });
        setDetails('');
        setIncidentValue('');
        setVenueValue('');
        setShowReport(false);
        setVenueError(false);
        setIncidentError(false);
        setSelectedIncident(0);
        setSelectedVenue(0);
      }
    }
  };

  // Load in the user information from local storage.
  const getUser = async () => {
    try {
      let obj = await AsyncStorage.getItem('@user');
      let user = JSON.parse(obj);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  // Function to navigate to venue details screen with the specific venue.
  const openVenue = (venue) => {
    navigation.navigate('Venue', {
      venue: venue,
      jwtToken: jwtToken
    });
  };

  /* Use effect that runs on initial load up (mount), gets current user location and 
     also fetches the necessary data by calling the functions defined in the file. */
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude
        });
        setCurrentPositionBool(true);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    getJwt();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            zIndex: 10,
            padding: 10,
            marginTop: 0
          }}
        >
          <Searchbar
            style={{
              borderBottomEndRadius: 0,
              borderBottomStartRadius: 0,
              borderTopEndRadius: 8,
              borderTopStartRadius: 8,
              zIndex: 11
            }}
            placeholder='Search Venue'
            onChangeText={(query) => {
              setSearchQuery(query);
              getVenuesBySearch(query);
            }}
            value={searchQuery}
          />
          <View
            style={{
              backgroundColor: gc.colors.white
            }}
          >
            {searchReceived ? (
              searchData === [] ? (
                <List.Item title='No venues found' />
              ) : (
                searchData.map((venue) => {
                  return (
                    <List.Item
                      key={venue['venue_id']}
                      description={venue['venue_city']}
                      title={venue['venue_name']}
                      onPress={() => openVenue(venue)}
                    />
                  );
                })
              )
            ) : null}
          </View>
        </View>
        <Snackbar
          duration={3000}
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          wrapperStyle={{ bottom: 0.02 * height }}
          style={{
            backgroundColor: reportSuccess
              ? gc.colors.successLightGreen
              : gc.colors.errorLightRed,
            borderColor: reportSuccess
              ? gc.colors.successGreen
              : gc.colors.errorRed,
            borderWidth: 2,
            borderRadius: 6,
            zIndex: 10
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: reportSuccess ? gc.colors.successGreen : gc.colors.errorRed
            }}
          >
            {reportMessage}
          </Text>
        </Snackbar>
        {venues === [] && !currentPositionBool ? (
          <ActivityIndicator size='large' />
        ) : (
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
            {venues !== []
              ? venues.map((venue) => {
                  return (
                    <Marker
                      key={venue['venue_id']}
                      coordinate={{
                        latitude: venue['venue_lat'],
                        longitude: venue['venue_long']
                      }}
                      icon={
                        severities.get(String(venue['venue_id'])) >= 4
                          ? require('../assets/images/redMark1.png')
                          : severities.get(String(venue['venue_id'])) < 4 &&
                            severities.get(String(venue['venue_id']))
                          ? require('../assets/images/orangeMark.png')
                          : require('../assets/images/greenMark.png')
                      }
                      title={venue['venue_name']}
                      tracksViewChanges={false}
                      onCalloutPress={() => openVenue(venue)}
                    >
                      <Callout onPress={() => openVenue(venue)}>
                        <View>
                          <Text>{venue['venue_name']}</Text>
                        </View>
                      </Callout>
                    </Marker>
                  );
                })
              : null}
          </MapView>
        )}

        <View style={styles.reportAndButtonsContainer}>
          <View style={styles.floatingButtonsContainer}>
            <View>
              <RoundButton
                icon={'menuIcon'}
                onPress={() => navigation.openDrawer()}
                wProportion={0.12}
                hProportion={0.12}
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
                wProportion={0.12}
                hProportion={0.12}
                background={true}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                right: 0
              }}
            ></View>
          </View>
          <View style={styles.reportBtn}>
            <Button
              type={'primary'}
              text={'Report'}
              onPress={() => {
                setShowReport(!showReport);
              }}
              hProportion={0.12}
              wProportion={0.85}
            />
          </View>
        </View>
        {showReport && (
          <OurModal>
            <View style={styles.formContainer}>
              <View style={{ padding: 10, zIndex: 1000 }}>
                <DropDownPicker
                  placeholder='Type of Incident'
                  open={incidentOpen}
                  value={incidentValue}
                  items={incidentItems.map((crime) => ({
                    label: crime['crime_name'],
                    value: crime['crime_id']
                  }))}
                  listMode={'SCROLLVIEW'}
                  setOpen={setIncidentOpen}
                  setValue={setIncidentValue}
                  zIndex={1000}
                  maxHeight={200}
                  style={{
                    borderColor: incidentError
                      ? gc.colors.errorRed
                      : gc.colors.darkGrey,
                    backgroundColor: '#f6f6f6',
                    width: 0.65 * width
                  }}
                  containerStyle={{
                    backgroundColor: '#f6f6f6',
                    width: 0.65 * width
                  }}
                  onSelectItem={(item) => setSelectedIncident(item.value)}
                />
              </View>
              <View style={{ padding: 10, zIndex: 10 }}>
                <DropDownPicker
                  searchable={true}
                  maxHeight={200}
                  searchPlaceholder='Search Venue'
                  placeholder='Venue'
                  open={venueOpen}
                  items={venues.map((venue) => ({
                    label: venue['venue_name'] + ' - ' + venue['venue_city'],
                    value: venue['venue_id']
                  }))}
                  value={venueValue}
                  setOpen={setVenueOpen}
                  setValue={setVenueValue}
                  zIndex={800}
                  style={{
                    borderColor: venueError
                      ? gc.colors.errorRed
                      : gc.colors.darkGrey,
                    zIndex: 10,
                    backgroundColor: '#f6f6f6',
                    width: 0.65 * width
                  }}
                  containerStyle={{
                    backgroundColor: '#f6f6f6',
                    width: 0.65 * width
                  }}
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
                  label='Details'
                  value={details}
                  onChangeText={(details) => setDetails(details)}
                />
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                <Button
                  type={'secondary'}
                  text={'Back'}
                  onPress={() => {
                    setIncidentValue('');
                    setVenueValue('');
                    setDetails('');
                    setShowReport(false);
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
          </OurModal>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
