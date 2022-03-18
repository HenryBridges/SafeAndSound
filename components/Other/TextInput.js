import React, { useState } from 'react';
import { TextInput, Dimensions } from 'react-native';
import gc from '../../general/globalColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const OurTextInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { hProportion, wProportion } = props;

  return (
    <TextInput
      {...props}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholderTextColor={
        isFocused ? gc.colors.periwinkle : gc.colors.darkGrey
      }
      style={[
        props.style,
        {
          borderColor: isFocused ? gc.colors.periwinkle : gc.colors.darkGrey,
          backgroundColor: gc.colors.white,
          color: isFocused ? gc.colors.periwinkle : gc.colors.darkGrey,
          borderRadius: 16,
          fontSize: 16,
          width: wProportion * width,
          height: hProportion * height
        }
      ]}
    />
  );
};

export default OurTextInput;
