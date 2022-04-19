import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Dimensions
} from 'react-native';
import gc from '../general/globalColors';
import RoundButton from '../components/Buttons/roundButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar, Card, Title, Button } from 'react-native-paper';

const height = Dimensions.get('window').height;

const Venue = ({ route, navigation }) => {
    const venue = route.params.venue;
    const [jwtToken, setJwtToken] = useState(route.params.jwtToken)
    const [severity, setSeverity] = useState(0);
    const [color, setColor] = useState(gc.colors.safeGreen)

    const getJwt = async () => {
        try {
            let jwt = await AsyncStorage.getItem('@jwt');
            setJwtToken(jwt);
            return jwt;
        } catch (error) {
            console.log(error);
        }
    };

    const getSeverity = async () => {
        fetch(`https://safe-sound-208.herokuapp.com/venues/severity/${venue.venue_id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((result) => result.json())
            .then((data) => handleResponseSeverity(data))
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleResponseSeverity = (data) => {
        let dangerLevel = data["generic"].average_severity;
        setSeverity(dangerLevel)
        if (dangerLevel >= 3 && dangerLevel < 4) {
            setColor(gc.colors.warningYellow)
        }
        if (dangerLevel >= 4) {
            setColor(gc.colors.dangerRed)
        }
    }

    useEffect(() => {
        if (jwtToken == '') {
            getJwt();
        }
        getSeverity();
    }, []);

    return (
        <>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: gc.colors.white,
                flexDirection: 'column'
            }}>
                <View>
                    <RoundButton
                        icon={'backArrow'}
                        onPress={() => navigation.goBack()}
                        wProportion={0.1}
                        hProportion={0.1}
                        background={true}
                    />
                    <Text style={styles.largeTitle}>{venue.venue_name}</Text>
                    <Text style={styles.subTitle}>{venue.venue_city}</Text>
                </View>
                <View style={{
                    marginTop: 20,
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Card elevation={6} style={{
                        width: '80%',
                        borderRadius: 10
                    }}>
                        <Card.Content>
                            <Title>Risk:</Title>
                            <Text style={{
                                fontSize: height * 0.022
                            }}>{severity}/5</Text>
                            <ProgressBar style={{
                                height: 0.05 * height
                            }}
                                progress={severity / 5}
                                color={color}
                            />

                        </Card.Content>
                    </Card>
                    <Card elevation={6} style={{
                        marginTop: 20,
                        width: '90%',
                        borderRadius: 10
                    }}>
                        <Card.Content>
                            <Title>Latest Reports:</Title>
                        </Card.Content>
                    </Card>
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    largeTitle: {
        fontSize: 0.065 * height,
        fontWeight: 'bold',
        marginLeft: 4.5,
        color: gc.colors.periwinkle,
        left: 16,
        marginTop: 10
    },
    subTitle: {
        fontSize: 0.034 * height,
        fontWeight: 'bold',
        marginLeft: 4.5,
        color: gc.colors.pink,
        left: 16
    }
});

export default Venue;