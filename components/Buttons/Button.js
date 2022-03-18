import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import gc from '../../general/globalColors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const button = (props) => {
  const { type, text, onPress, wProportion, hProportion, topSpace } = props;

  const btnColour = type == 'primary' ? gc.colors.periwinkle : gc.colors.white;
  const textColor = type == 'primary' ? gc.colors.white : gc.colors.periwinkle;
  const bordThick = type == 'primary' ? 0 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: btnColour,
        width: width * wProportion,
        height: height * hProportion,
        borderRadius: 32,
        borderWidth: bordThick,
        borderColor: gc.colors.periwinkle,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        top: topSpace,
        margin: 10
      }}
    >
      <Text style={{ color: textColor, fontWeight: '700' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default button;
