import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions
} from 'react-native';
import gc from '../general/globalColors';
import RoundButton from '../components/Buttons/roundButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';

const height = Dimensions.get('window').height;

const Venue = ({ route, navigation }) => {
    const venue = route.params.venue;
    const [jwtToken, setJwtToken] = useState(route.params.jwtToken)
    const [severity, setSeverity] = useState(0);
    const [color, setColor] = useState(gc.colors.safeGreen)


    const createDifferentColours = () => {

    }

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
                <RoundButton
                    icon={'backArrow'}
                    onPress={() => navigation.goBack()}
                    wProportion={0.1}
                    hProportion={0.1}
                    background={true}
                />
                <Text style={styles.largeTitle}>{venue.venue_name}</Text>
                <Text style={styles.subTitle}>{venue.venue_city}</Text>
                <ProgressBar progress={0.5} color={color} />
                <Text>{severity}</Text>
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
        color: gc.colors.periwinkle,
        left: 16,
        top: 15
    }
});

export default Venue;