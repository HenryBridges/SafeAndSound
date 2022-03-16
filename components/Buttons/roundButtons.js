import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Platform
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const RoundButton = (props) => {
  const { type, icon, onPress, wProportion, hProportion } = props;

  const btnColour = type == 'primary' ? '#00a88f' : '#f46d62';
  const textColor = '#fef2f2';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: btnColour,
        width: width * wProportion,
        height: height * hProportion,
        borderRadius: 0.5 * height,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10
      }}
    >
      <Image source={icon} />
    </TouchableOpacity>
  );
};

export default RoundButton;
