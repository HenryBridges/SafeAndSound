import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const button = (props) => {
  const { type, text, onPress, wProportion, hProportion } = props;

  const btnColour = type == 'primary' ? '#00a88f' : '#f46d62';
  const textColor = '#fef2f2';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: btnColour,
        width: width * wProportion,
        height: height * hProportion,
        borderRadius: 32,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10
      }}
    >
      <Text style={{ color: textColor, fontWeight: '700' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default button;
