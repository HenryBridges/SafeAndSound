import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import RoundButton from '../components/Buttons/roundButtons';
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import gc from '../general/globalColors';
import { TextInput } from 'react-native-gesture-handler';
import { locationIcon } from '../assets/images/images';
import { menuIcon } from '../assets/images/images';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Stats = ({ navigation }) => {
  const [showReport, setShowReport] = useState(false);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>



        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search here"
            placeholderTextColor="#000"
            autoCapitalize="none"
            style={{ flex: 1, padding: 0 }}
          />
        </View>


        <View style={styles.titleWrapper}>
          <Text style={styles.largeTitle}>Venue: </Text>
        </View>


      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    lexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4.5,
  },
  backBtn: {
    left: 25
  },
});

export default Stats;
