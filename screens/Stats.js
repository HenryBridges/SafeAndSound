import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import gc from '../general/globalColors';
import { Card, Title, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Stats = ({ navigation }) => {
  // Use states for conditional rendering and storing fetched reports.
  const [hasReports, setHasReports] = useState(false);
  const [latestReports, setLatestReports] = useState([]);

  // JWT used for authorising API calls.
  const [jwtToken, setJwtToken] = useState('');

  // Fetch JWT token from local storage and call the latest reports function to fetch those.
  const getJwt = async () => {
    try {
      let jwt = await AsyncStorage.getItem('@jwt');
      setJwtToken(jwt);
      findLatestReports(jwt);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch the latest reports (10 is the limit set in backend).
  const findLatestReports = (jwt) => {
    fetch(`https://safe-sound-208.herokuapp.com/reports/latest`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((result) => result.json())
      .then((data) => handleResponseLatest(data))
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle the response from the above fetch for latest reports.
  const handleResponseLatest = (data) => {
    if (data['success']) {
      setLatestReports(data['generic']);
      setHasReports(true);
    }
  };

  // Use effect to call the fetching of jwt token and hence fetching latest reports too.
  useEffect(() => {
    if (jwtToken == '') {
      getJwt();
    }
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: gc.colors.white,
          flexDirection: 'column'
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontSize: 0.045 * height,
              fontWeight: 'bold',
              marginLeft: 4.5,
              color: gc.colors.periwinkle,
              left: 16,
              marginTop: 10
            }}
          >
            General
          </Text>
          <Text
            style={{
              fontSize: 0.045 * height,
              fontWeight: 'bold',
              marginLeft: 4.5,
              color: gc.colors.lightPeriwinkle,
              left: 16
            }}
          >
            Statistics
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: 0.35 * height,
            width: width
          }}
        >
          <Card
            elevation={6}
            style={{
              borderRadius: 10,
              width: 0.8 * width
            }}
          >
            <Card.Content>
              <Title style={{ textAlign: 'center' }}>
                Total Number Of Reports:
              </Title>
              <Text
                style={{
                  fontSize: height * 0.04,
                  textAlign: 'center'
                }}
              >
                100
              </Text>
            </Card.Content>
          </Card>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <Card
              elevation={6}
              style={{
                borderRadius: 10,
                width: 0.475 * width
              }}
            >
              <Card.Content>
                <Title style={{ fontSize: 0.025 * height }}>
                  Safest Venue:
                </Title>
                <Text
                  style={{
                    fontSize: height * 0.02
                  }}
                >
                  Heebies Jeebies
                </Text>
              </Card.Content>
            </Card>
            <View style={{ width: 0.025 * width }}></View>
            <Card
              elevation={6}
              style={{
                borderRadius: 10,
                width: 0.475 * width
              }}
            >
              <Card.Content>
                <Title style={{ fontSize: 0.025 * height }}>
                  Riskiest Venue:
                </Title>
                <Text
                  style={{
                    fontSize: height * 0.02
                  }}
                >
                  Soho Bar
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: 0.975 * width,
            height: 0.35 * height
          }}
        >
          <Card
            elevation={6}
            style={{
              borderRadius: 10
            }}
          >
            <Card.Content>
              <Title>Latest 10 Reports:</Title>
              <ScrollView
                style={{
                  maxHeight: 0.325 * height
                }}
              >
                {!hasReports ? (
                  <Text>No Data to be shown</Text>
                ) : (
                  latestReports.map((report) => {
                    let date = report['report_date']
                      .replace('T', ' ')
                      .substring(0, 19);
                    return (
                      <List.Item
                        key={report['report_id']}
                        description={report['report_details']}
                        title={report['report_type'] + ' - ' + date}
                      />
                    );
                  })
                )}
              </ScrollView>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16
  },

  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4.5
  }
});

export default Stats;
