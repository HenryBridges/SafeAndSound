import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Platform,
  View
} from 'react-native';
import gc from '../../general/globalColors';
import { backArrow, menuIcon, chartIcon } from '../../assets/images/images';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const RoundButton = (props) => {
  const { icon, onPress, wProportion, hProportion, background, margin } = props;

  const img =
    icon == 'backArrow' ? backArrow : icon == 'menuIcon' ? menuIcon : chartIcon;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: background ? gc.colors.lightPeriwinkle : null,
        width: width * wProportion,
        height: height * hProportion,
        borderRadius: 0.5 * height,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        margin: margin
      }}
    >
      <View
        style={{
          height: height * hProportion * 0.75,
          width: width * wProportion * 0.6,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          source={img}
          style={{ width: '80%', height: '80%', tintColor: gc.colors.white }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;
