import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import gc from '../../general/globalColors';
import RoundButton from '../Buttons/roundButtons';
import { showPasswordEye } from '../../assets/images/images';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const OurTextInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { text, hProportion, wProportion, secure } = props;
  const [showPass, setShowPass] = useState(false);

  return (
    <TextInput
      mode='outlined'
      label={text}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      secureTextEntry={secure}
      right={
        secure ? null : (
          <RoundButton
            type='primary'
            icon={showPasswordEye}
            onPress={() => setShowPass(true)}
            wProportion={0.05}
            hProportion={0.05}
            background={false}
          />
        )
      }
      theme={{
        roundness: 16,
        colors: {
          primary: isFocused ? gc.colors.periwinkle : gc.colors.darkGrey
        }
      }}
      style={{
        width: wProportion * width,
        height: hProportion * height,
        margin: 5
      }}
    />
  );
};

export default OurTextInput;
