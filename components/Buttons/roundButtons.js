import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Platform
} from 'react-native';
import gc from '../../general/globalColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const RoundButton = (props) => {
  const { type, icon, onPress, wProportion, hProportion, background } = props;

  const btnColour = type == 'primary' ? gc.colors.pink : gc.colors.blue;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: background ? btnColour : null,
        width: width * wProportion,
        height: height * hProportion,
        borderRadius: 0.5 * height,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10
      }}
    >
      <Image
        source={icon}
        style={{
          height: height * hProportion * 0.75,
          width: width * wProportion * 0.75
        }}
      />
    </TouchableOpacity>
  );
};

export default RoundButton;
