import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Button from '../components/Buttons/Button';
import gc from '../general/globalColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.log(height);
console.log(width);

const Account = ({ navigation }) => {
  return (
  <SafeAreaView style = {{flex: 1, backgroundColor: gc.colors.white}}>
     <View style = {styles.titleWrapper}>
        <Text style = {styles.largeTitle} >Account </Text>
      </View>
      <View style = {styles.subTitleWrapper}>
        <Text style = {styles.subTitle} >Details </Text> 
      </View>
      <View style = {styles.detailsWrapper}>
        <Text style = {styles.detailsStyle}>Email: </Text> 
        <Text style = {styles.detailsStyle}>Signed up using: </Text> 
        <Text style = {styles.detailsStyle}>Email verified: </Text> 
      </View>
      

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ alignSelf: 'center' }}>Account Screen</Text>
      <Button
        type={'Primary'}
        text={'Go Back'}
        onPress={() => navigation.goBack()}
        wProportion={0.6}
        hProportion={0.12}
        topSpace={5}
      />
    </View>
  </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  
  titleWrapper: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  subTitleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  detailsWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
    marginLeft: 4.5
  },
  reportAndButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 30,
    alignSelf: 'center'
  },
  largeTitle: {
    fontSize: 0.056 * height,
    fontWeight: 'bold',
    marginLeft: 4.5,
    color: gc.colors.periwinkle
  },
  subTitle: {
    fontSize: 0.034 * height,
    fontWeight: 'bold',
    marginLeft: 4.5,
    color: gc.colors.periwinkle
  },
  detailsStyle: {
    fontSize:0.016 * height,
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: gc.colors.lightPink,
    borderRadius: 8,
    margin: 3.5,
 
  }
  
  
});

export default Account;
