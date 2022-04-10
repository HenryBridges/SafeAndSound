import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Buttons/Button';

const Account = ({ navigation }) => {
  return (
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
  );
};

export default Account;
