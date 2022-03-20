import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import gc from '../../general/globalColors';
import RoundButton from '../Buttons/roundButtons';
import { openEye } from '../../assets/images/images';

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
      secureTextEntry={secure ? showPass : false}
      right={
        secure ? (
          <TextInput.Icon
            name={openEye}
            onPress={() => setShowPass(!showPass)}
            style={{ top: '20%' }}
          />
        ) : null
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
