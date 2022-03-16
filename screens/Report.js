import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Button from '../components/Buttons/Button';

const Report = ({ navigation }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fef2f2'
        }}
      >
        <Button
          type={'primary'}
          text={'buttonOne'}
          onPress={() => {
            navigation.navigate('Stats');
          }}
          hProportion={0.1}
          wProportion={0.75}
        />

        <Button
          type={'secondary'}
          text={'buttonTwo'}
          onPress={() => {
            console.log('btn2');
          }}
          hProportion={0.1}
          wProportion={0.75}
        />
      </View>
    </>
  );
};

export default Report;
