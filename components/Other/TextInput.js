import React, { useState } from 'react';
import { TextInput, Dimensions } from 'react-native';
import gc from '../../general/globalColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const OurTextInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={isFocused ? 'Focus' : 'Blur'}
      style={[
        props.style,
        {
          borderColor: isFocused ? theme.colors.primary : theme.colors.darkGrey
        }
      ]}
    />
  );
};

export default OurTextInput;
